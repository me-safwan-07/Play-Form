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

export const getForms = async(req: Request, res: Response): Promise<void> => {
  const environmentId = req.params.environmentId;
  const { linit, offset, filterCriteria} = req.body;
  let formsPrisma;
  try {
    formsPrisma = await prisma.form.findMany({
      where: {
        environmentId: environmentId,
        ...buildWhereClause(filterCriteria),
      },
      select: selectForm,
      orderBy: buildOrderByClause(filterCriteria.sortBy),
      take: linit ? linit : undefined,
      skip: offset ? offset : undefined
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      res.status(400).json({ error: "Database error" });
    }
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  const forms: TForm[] = [];

  if (formsPrisma) {
    for (const formPrisma of formsPrisma) {
      const transformedSurvey = transformPrismaSurvey(formPrisma);
      forms.push(transformedSurvey);
    }
  }

  res.status(200).json({ forms });
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
