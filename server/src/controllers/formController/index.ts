// getformcount

import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import { buildOrderByClause, buildWhereClause, transformPrismaSurvey } from "../../utils/formsUtils";
import { TForm } from "../../types/forms";

export const selectForm = {
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
  type: true,
  environmentId: true,
  status: true,
  welcomeCard: true,
  questions: true,
  thankYouCard: true,
  displayLimit: true,
  autoClose: true,
  runOnDate: true,
  closeOnDate: true,
  delay: true,
  displayPercentage: true,
  autoComplete: true,
  verifyEmail: true,
  redirectUrl: true,
  styling: true,
  surveyClosedMessage: true,
  resultShareKey: true,
};

export const getForm = async (req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  let formPrisma;
  try {
    formPrisma = await prisma.form.findUnique({
      where: {
        id: formId
      },
      select: selectForm
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      res.status(400).json({ error: "Database error" });
    }
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  if (!formPrisma) {
    res.status(404).json({ error: "Form not found" });
    return;
  }

  const form: TForm = transformPrismaSurvey(formPrisma);
  res.status(200).json({ form });
}

export const getForms = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const environmentId = req.params.environmentId;
  const { limit, offset, filterCriteria} = req.body;
  let formsPrisma;
  try {
    formsPrisma = await prisma.form.findMany({
      where: {
        environmentId: environmentId,
        ...buildWhereClause(filterCriteria),
      },
      select: selectForm,
      orderBy: buildOrderByClause(filterCriteria.sortBy),
      take: limit ? limit : undefined,
      skip: offset ? offset : undefined
    });

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      res.status(400).json({ error: "Database error" });
    }
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }

  const forms: TForm[] = [];

  if (formsPrisma) {
    for (const formPrisma of formsPrisma) {
      const transformedSurvey = transformPrismaSurvey(formPrisma);
      forms.push(transformedSurvey);
    }
  }

  res.status(200).json({ forms });
  next();
}

export const getFormCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const environmentId: string = req.params.environmentId;
      const formcount = await prisma.form.count({
        where: {
          environmentId: environmentId
        }
      });

      res.status(200).json({ formcount });
      next();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
        res.status(400).json({ error: "Error in getting form count" });
    }
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

// export const updateForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { updatedForm } = req.body;

//   try {
//     const formId = updatedForm.id;
//     let data: any = {};
    
//     const currentForm = ;
    
//   }
// };

export const deleteForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const formId = req.params.formId;

  try {
    await prisma.form.delete({
      where: {
        id: formId
      },
      select: selectForm
    });

    res.status(200).json({ message: "Form deleted successfully" });
    next();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err);
      res.status(400).json({ error: "Error in deleting form" });
    }
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
    next(err);
  }
};

export const createForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { environmentId } = req.params;
  const { formBody } = req.body;

  try {
    const form = await prisma.form.create({
      data: {
        ...formBody,
        environment: {
          connect: {
            id: environmentId
          }
        }
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
  };
};
