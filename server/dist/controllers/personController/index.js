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
exports.getPerson = exports.selectPerson = void 0;
const client_1 = require("@prisma/client");
const database_1 = require("../../database");
const errors_1 = require("../../types/errors");
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
// getPerson
// getPeople
// getPeopleCount
// createPerson
// deletePerson
// getPersonByUserId
// getIsPersonMonthlyActive
