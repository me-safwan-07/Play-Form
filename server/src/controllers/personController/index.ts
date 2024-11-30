import { Prisma } from "@prisma/client";
import express, { Express, Request, Response, NextFunction } from "express";
import { prisma } from "../../database";
import { DatabaseError } from "../../types/errors";
import { TPerson } from "../../types/people";

export const selectPerson = {
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
//   environmentId: true,
};

export const getPerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const personId: string = req.params.id;

    try {
        // Fetch the person from the database
        const person: TPerson | null = await prisma.person.findUnique({
            where: { id: personId },
            select: selectPerson,
        });

        if (!person) {
            res.status(404).json({ error: "Person not found" });
            return;
        }

        // Send the person data in the response
        res.status(200).json(person);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return next(new DatabaseError(error.message));
        }

        next(error);
    }
};

// getPerson
// getPeople
// getPeopleCount
// createPerson
// deletePerson
// getPersonByUserId
// getIsPersonMonthlyActive