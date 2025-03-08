import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";
import { displayOptions, Prisma, PrismaClient } from "@prisma/client";
import { buildOrderByClause, buildWhereClause, transformPrismaSurvey } from "../../utils/formsUtils";
import { structuredClone } from "../../utils/pollyfills/structuredClone";
import { validateInputs } from "../../utils/validate";
import { ZId } from "../../types/environment";
import { cache } from "../../config/cache";
import { formCache } from "./cache";
import { ZOptionalNumber } from "../../types/common";
import { off } from "process";
import { TForm } from "../../types/forms";
import { DatabaseError } from "../../utils/errors";

export const selectForm = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  environmentId: true,
  createdBy: true,
  status: true,
  welcomeCard: true,
  questions: true,
  thankYouCard: true,
  displayOptions: true,
  recontactDays: true,
  displayLimit: true,
  autoClose: true,
  runOnDate: true,
  closeOnDate: true,
  delay: true,
  displayPercentage: true,
  autoComplete: true,
  verifyEmail: true,
  redirectUrl: true,
  productOverwrites: true,
  styling: true,
  surveyClosedMessage: true,
  singleUse: true,
  pin: true,
  resultShareKey: true,
  segment: {
    include: {
      forms: {
        select: {
          id: true,
        },
      },
    },
  },
};

interface CustomRequest extends Request {
  userId?: string;
}

export const getForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const formId = req.params.formId;
  const userId = req.user;
  cache(
    async() => {
      validateInputs([formId, ZId]);

      let formPrisma;
      try {
          formPrisma = await prisma.form.findUnique({
            where: {
              id: formId,
              createdAt: userId
            },
            select: selectForm,
          });

          if (!prisma) {
            res.status(404).json({ message: "Form not found" })
          }

          const form = transformPrismaSurvey(formPrisma)
          res.status(200).json({ form });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(error.message);
            res.status(404).json({ error: "Form not found" });
            next(error);
          }
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
          next(error);
        }
    },
    `getForm-${formId}`,
    {
      tag: [formCache.tag.byId(formId)]
    }
  )();
}

export const getForms = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  const { limit, offset, filterCriteria } = req.query;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  let formsPrisma: Awaited<ReturnType<typeof prisma.form.findMany>>;

  try {
    const filters = typeof filterCriteria === 'string' ? JSON.parse(filterCriteria) : {};

    // ✅ Correct way to use cache with async/await
    formsPrisma = await cache(
      async () => {
        return await prisma.form.findMany({
          where: {
            createdBy: userId,
            ...buildWhereClause(filters),
          },
          select: selectForm,
          orderBy: buildOrderByClause(filters?.sortBy),
          take: limit ? Number(limit) : undefined,
          skip: offset ? Number(offset) : undefined,
        });
      },
      `getForms-${limit}-${offset}-${JSON.stringify(filterCriteria)}`,
      {
        tag: [formCache.tag.byEnvironementId(userId)],
      }
    )();

    if (!formsPrisma) {
      res.status(404).json({ error: "No forms found" });
      return;
    }

    const form: TForm[] = [];

    for(const formPrisma of formsPrisma) {
      const transformedForm = transformPrismaSurvey(formPrisma);
      form.push(transformedForm)
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching forms:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({ error: "Database error occurred" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const updateForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const formId = req.params.formId;
  const userId = req.userId;
  const updatedForm = req.body.updatedForm;

  // console.log("Received updated form:", updatedForm);

  try {
    // Verify form ownership
    const form = await prisma.form.findFirst({
      where: {
        createdBy: userId,
        id: formId
      }
    });

    if (!form) {
      res.status(404).json({ error: "Form not found or unauthorized" });
      return;
    }

    // Fix: Use updatedForm instead of updateForm (which was undefined)
    const data = {
      ...updatedForm,
      updatedAt: new Date(),
    };

    // Handle status changes
    if (data.status === 'scheduled' && data.runOnDate === null) {
      data.status = 'inProgress';
    }

    if (
      (data.status === 'completed' || data.status === 'paused' || data.status === 'inProgress') &&
      data.runOnDate &&
      data.runOnDate > new Date()
    ) {
      data.status = 'scheduled';
    }

    // Remove any properties that shouldn't be updated directly
    const { id, createdAt, createdBy, ...updateData } = data;

    const modifiedForm = await prisma.form.update({
      where: { 
        id: formId 
      },
      data: updateData,
      select: selectForm
    });

    res.status(200).json({ form: modifiedForm });
  } catch (error) {
    console.error("Update error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).json({ error: "Form not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
    next(error);
  }
};

export const deleteForm = async(req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  const userId = req.user;

  try {
    // Verify form ownership
    const form = await prisma.form.findFirst({
      where: {
        id: formId,
        createdBy: userId
      }
    });

    if (!form) {
      res.status(404).json({ error: "Form not found or unauthorized" });
      return;
    }

    await prisma.form.delete({
      where: { id: formId }
    });

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createForm = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }


    const formBody = req.body;
    
    formBody.creator = {
      connect: {
        id: userId
      }
    };

    const form = await prisma.form.create({
      data: {
        ...formBody,
      },
      select: selectForm,
    });
    console.log(form)
    res.status(200).json({ form });
    next();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err);
      res.status(400).json({ error: "Error in creating form" });
    }
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
    next(err);
  }
};

export const getFormCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user;
  try {
    const formCount = await prisma.form.count({
      where: {
        createdBy: userId
      }
    });
    if (!formCount) {
      res.status(200).json({ count: 0 });
      return;
    }
    res.status(200).json({ count: formCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

export const duplicateForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const environmentId = req.params.environmentId;
  const formId = req.body.formId;
  const userId = req.userId;

  validateInputs([environmentId, ZId], [formId, ZId]);

  try {
    const existingForm = await prisma.form.findUnique({
      where: { id: formId }
    });
    const currentDate = new Date();
    if (!existingForm) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    const { id, createdBy, environmentId, segmentId, ...formDataToCopy } = existingForm;
    const duplicateForm = await prisma.form.create({
      data: { 
        ...formDataToCopy,
        createdAt: currentDate,
        updatedAt: currentDate,
        name: `${existingForm.name} (Copy)`,
        status: "draft",
        questions: existingForm.questions as Prisma.JsonObject,
        welcomeCard: existingForm.welcomeCard as Prisma.JsonObject,
        thankYouCard: existingForm.thankYouCard as Prisma.JsonObject,
        environment: {
          connect: {
            id: environmentId
          },
        },
        creator: {
          connect: {
            id: userId
          }
        },
        formClosedMessage: existingForm.formClosedMessage
          ? structuredClone(existingForm.formClosedMessage)
          : undefined,
        singleUse: existingForm.singleUse ? structuredClone(existingForm.singleUse): undefined,
        productOverwrites: existingForm.productOverwrites
          ? structuredClone(existingForm.productOverwrites)
          : undefined,
        styling: existingForm.styling ? structuredClone(existingForm.styling) : undefined,
        verifyEmail: existingForm.verifyEmail
          ? structuredClone(existingForm.verifyEmail)
          : undefined,
        // we'll update the segment later
        segment: undefined,
      },
    });

    // if the existing form has an inline segment, we copy the filters and create a new inline segment and connect it to the new form
    // if (existingForm.)
    res.status(200).json({ form: duplicateForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
}