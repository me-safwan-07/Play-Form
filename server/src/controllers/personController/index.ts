import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database";
import { DatabaseError } from "../../utils/errors";
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

export const createPerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.body;

    // Case 1: Validate the presence of the required `userId` field
    if (!userId) {
        res.status(400).json({ error: "Missing required field: userId" });
        return;
    }

    try {
        // Case 2: Check if a person already exists with the same `userId`
        const existingPerson = await prisma.person.findUnique({
            where: { userId },
            select: { id: true }, // Fetch minimal data
        });

        if (existingPerson) {
            res.status(409).json({ error: "Person with this userId already exists" });
            return;
        }

        // Case 3: Create a new person in the database
        const person = await prisma.person.create({
            data: { userId },
            select: selectPerson,
        });

        res.status(201).json(person);

    } catch (error) {
        // Case 4: Handle Prisma-specific known errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Duplicate key error (code P2002)
            if (error.code === "P2002") {
                res.status(409).json({ error: "Duplicate entry: person already exists" });
                return;
            }

            // Other Prisma-specific errors
            res.status(500).json({ error: `Database error: ${error.message}` });
            return;
        }

        // Case 5: Handle unexpected errors
        next(error);
    }
};

export const deletePerson = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userId: string = req.params.id;

    // Validate the presence of the `userId` parameter
    if (!userId) {
        res.status(400).json({ error: "Missing required parameter: userId" });
        return;
    }

    try {
        // Check if the person exists before attempting to delete
        const existingPerson = await prisma.person.findUnique({
            where: { id: userId },
        });

        if (!existingPerson) {
            res.status(404).json({ error: "Person not found" });
            return;
        }

        // Delete the person record
        const deletedPerson = await prisma.person.delete({
            where: { id: userId },
            select: selectPerson,
        });

        res.status(200).json({
            message: "Person deleted successfully",
            data: deletedPerson,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle specific Prisma errors
            switch (error.code) {
                case "P2025": // Record not found error
                    res.status(404).json({ error: "Person not found" });
                    break;
                default:
                    res.status(500).json({
                        error: `Database error: ${error.message}`,
                    });
            }
            return;
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
            // Handle validation errors
            res.status(400).json({
                error: `Validation error: ${error.message}`,
            });
            return;
        }

        // Handle other unexpected errors
        next(error);
    }
};


// getPersonByUserId
// getIsPersonMonthlyActive