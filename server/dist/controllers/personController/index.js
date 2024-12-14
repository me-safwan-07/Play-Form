"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.createPerson = exports.getPerson = exports.selectPerson = void 0;
const client_1 = require("@prisma/client");
const database_1 = require("../../database");
const errors_1 = require("../../utils/errors");
exports.selectPerson = {
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    //   environmentId: true,
};
const getPerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const personId = req.params.id;
    try {
        // Fetch the person from the database
        const person = yield database_1.prisma.person.findUnique({
            where: { id: personId },
            select: exports.selectPerson,
        });
        if (!person) {
            res.status(404).json({ error: "Person not found" });
            return;
        }
        // Send the person data in the response
        res.status(200).json(person);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return next(new errors_1.DatabaseError(error.message));
        }
        next(error);
    }
});
exports.getPerson = getPerson;
const createPerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    // Case 1: Validate the presence of the required `userId` field
    if (!userId) {
        res.status(400).json({ error: "Missing required field: userId" });
        return;
    }
    try {
        // Case 2: Check if a person already exists with the same `userId`
        const existingPerson = yield database_1.prisma.person.findUnique({
            where: { userId },
            select: { id: true }, // Fetch minimal data
        });
        if (existingPerson) {
            res.status(409).json({ error: "Person with this userId already exists" });
            return;
        }
        // Case 3: Create a new person in the database
        const person = yield database_1.prisma.person.create({
            data: { userId },
            select: exports.selectPerson,
        });
        res.status(201).json(person);
    }
    catch (error) {
        // Case 4: Handle Prisma-specific known errors
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
});
exports.createPerson = createPerson;
const deletePerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // Validate the presence of the `userId` parameter
    if (!userId) {
        res.status(400).json({ error: "Missing required parameter: userId" });
        return;
    }
    try {
        // Check if the person exists before attempting to delete
        const existingPerson = yield database_1.prisma.person.findUnique({
            where: { id: userId },
        });
        if (!existingPerson) {
            res.status(404).json({ error: "Person not found" });
            return;
        }
        // Delete the person record
        const deletedPerson = yield database_1.prisma.person.delete({
            where: { id: userId },
            select: exports.selectPerson,
        });
        res.status(200).json({
            message: "Person deleted successfully",
            data: deletedPerson,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            // Handle validation errors
            res.status(400).json({
                error: `Validation error: ${error.message}`,
            });
            return;
        }
        // Handle other unexpected errors
        next(error);
    }
});
exports.deletePerson = deletePerson;
// getPersonByUserId
// getIsPersonMonthlyActive
