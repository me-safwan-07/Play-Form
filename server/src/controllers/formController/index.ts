// getformcount

import { NextFunction, Request, Response } from "express";
// import mongoose from "mongoose";

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

interface CustomRequest extends Request {
  userId?: string;
}

export const getForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.user;
  const formId = req.params.formId;

  if (!formId) {
    console.log("No formId");
    res.status(404).json({ error: "Form not found" });
    return;
  }

  try {
    const form = await prisma.form.findUnique({
      where: { 
        id: formId,
        createdBy: userId
      },
      select: selectForm,
    });

    if (!form) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    res.status(200).json({ form, userId });
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
  const userId = req.userId;
  
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { limit, offset, filterCriteria } = req.query;
  try {
    const filters = typeof filterCriteria === 'string' ? JSON.parse(filterCriteria) : {};
    const forms = await prisma.form.findMany({
      where: {
        createdBy: userId,
        ...buildWhereClause(filters)
      },
      select: selectForm,
      orderBy: buildOrderByClause(filters.sortBy),
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined
    });

    res.status(200).json({ forms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateForm = async(req: Request, res: Response): Promise<void> => {
  const formId = req.params.formId;
  const userId = req.user;
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
}
