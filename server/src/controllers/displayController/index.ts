import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import { DatabaseError } from "../../utils/errors";
import { getPerson } from "../personController";
import { TPerson } from "../../types/people";

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


export const getDisplay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { displayId } = req.params;
  try {
    const display = await prisma.display.findUnique({
      where: {
        id: displayId,
      },
      select: selectDisplay,
    });

    if (!display) {
      res.status(404).json({ error: "Display not found" });
      return;
    }

    res.status(200).json(display);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return next(new DatabaseError(error.message));
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

export const updateDisplay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let person: TPerson | null = null;
  

}

// export const createDisplay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { userId, formId } = req.body;

//     if (!formId) {
//         res.status(400).json({ error: "Survey ID is required" });
//         return 
//     }

//     try {
//         let person = null;

//         if (userId) {
//             person = await getPersonByUserId(userId);
//             if (!person) {
//                 person = await createPerson(userId);
//             }
//         }

//         const display = await prisma.display.create({
//             data: {
//               formId,
//               ...(person && {
//                 personId: person.id,
//               }),
//             },
//             select: selectDisplay
//           });

//         res.status(201).json(display);
//     } catch(error) {
//         if (error instanceof Prisma.PrismaClientKnownRequestError) {
//             res.status(500).json({ error: "Database error: " + error.message });
//         } else {
//             res.status(500).json({ error: "An unexpected error occurred." });
//         }
//     }
// };
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
export const getDisplayCountBySurveyId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { surveyId } = req.params;
    const { filters } = req.body;

    try {
        const display = await prisma.display.count({ // if get any issue in database chage into findUnique
            where: {
              surveyId: surveyId,
              ...(filters && 
                filters.createdAt && {
                  createdAt: {
                    gte: filters.createdAt.min,
                    lte: filters.createdAt.max,
                  },
                }
              )
            },
        });

        if (!display) {
            res.status(404).send({ error: "Display not found"});
        }

        res.status(201).json(display);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(500).send({ error: "Database error: " + error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
};
