// getformcount

import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user?: {
    userId: string;
  };
}
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import { buildOrderByClause, buildWhereClause, transformPrismaSurvey } from "../../utils/formsUtils";
import { TForm } from "../../types/forms";

export const selectForm = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  // type: true,
  // environmentId: true,
  status: true,
  welcomeCard: true,
  questions: true,
  thankYouCard: true,
  // displayLimit: true,
  // autoClose: true,
  // runOnDate: true,
  // closeOnDate: true,
  delay: true,
  displayPercentage: true,
  // autoComplete: true,
  verifyEmail: true,
  redirectUrl: true,
  styling: true,
  // surveyClosedMessage: true,
  resultShareKey: true,
};

export const getForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const formId = req.params.formId;
  console.log(formId);
  if (!formId) {
    console.log("No formId");
    res.status(404).json({ error: "Form not found" });
    return;
  }

  try {
    const form = await prisma.form.findUnique({
      where: { 
        id: formId,
      },
      select: selectForm,
    });

    if (!form) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

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
};

export const getForms = async(req: Request, res: Response): Promise<void> => {
  const userId = req.user;
  const { page = 1, limit = 10, search = "" } = req.query;
  
  try {
    const skip = (Number(page) - 1) * Number(limit);
    
    const [forms, total] = await Promise.all([
      prisma.form.findMany({
        where: {
          createdBy: userId,
          name: { contains: search as string, mode: 'insensitive' }
        },
        select: {
          ...selectForm,
          responses: { select: { id: true }},
          displays: { select: { id: true }}
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.form.count({
        where: {
          createdBy: userId,
          name: { contains: search as string, mode: 'insensitive' }
        }
      })
    ]);

    res.status(200).json({
      forms,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        page: Number(page),
        limit: Number(limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateForm = async(req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  const userId = req.params.userId;
  const updates = req.body;

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

    const updatedForm = await prisma.form.update({
      where: { id: formId },
      data: updates,
      select: selectForm
    });

    res.status(200).json({ form: updatedForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteForm = async(req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  const userId = req.params.userId;

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

export const createForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const createdBy = req.params?.userId; 

  if (!createdBy) {
    res.status(401).json({ error: "Unauthorized" });
    console.log("NO created by");
    return;
  }

  const formBody = req.body;

  try {
    formBody.creator = {
      connect: {
        id: createdBy
      }
    };

    const form = await prisma.form.create({
      data: {
        ...formBody,
      },
      select: selectForm,
    });

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
