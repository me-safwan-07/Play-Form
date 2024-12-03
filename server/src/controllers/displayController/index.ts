import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import { DatabaseError } from "../../types/errors";
import { getPerson } from "../personController";
import { connect } from "http2";

export const selectDisplay = {
  id: true,
  createdAt: true,
  updatedAt: true,
  surveyId: true,
  responseId: true,
  personId: true,
  status: true,
};

const ITEMS_PER_PAGE = 10;

const getPersonByUserId = async (userId: string) => {
  return await prisma.person.findUnique({
    where: {
      userId,
    },
  });
};

const createPerson = async (userId: string) => {
  return await prisma.person.create({
    data: {
      userId,
    },
  });
};



export const createDisplay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId, surveyId } = req.body;

    if (!surveyId) {
        res.status(400).json({ error: "Survey ID is required" });
        return 
    }

    try {
        let person = null;

        if (userId) {
            person = await getPersonByUserId(userId);
            if (!person) {
                person = await createPerson(userId);
            }
        }

        const display = await prisma.display.create({
            data: {
              surveyId,
              ...(person && {
                personId: person.id,
              }),
            },
            select: selectDisplay
          });

        res.status(201).json(display);
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({ error: "Database error: " + error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
};
export const getDisplayByPersonId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { personId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    try {
        const display = await prisma.display.findMany({ // if get any issue in database chage into findUnique
            where: {
                id: personId,
            },
            select: selectDisplay,
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (page - 1),
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!display) {
            res.status(404).send({ error: "Display not found"});
        }

        res.status(201).json(display);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientInitializationError) {
            res.status(500).send({ error: "Database error: " + error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
};

// export const deleteDisplayByResponseId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const responseId = req.params
//     const surve
// };
