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
exports.getDisplayByPersonId = exports.createDisplay = exports.selectDisplay = void 0;
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
exports.selectDisplay = {
    id: true,
    createdAt: true,
    updatedAt: true,
    surveyId: true,
    responseId: true,
    personId: true,
    status: true,
};
const ITEMS_PER_PAGE = 10;
const getPersonByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.person.findUnique({
        where: {
            userId,
        },
    });
});
const createPerson = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.person.create({
        data: {
            userId,
        },
    });
});
const createDisplay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, surveyId } = req.body;
    if (!surveyId) {
        res.status(400).json({ error: "Survey ID is required" });
        return;
    }
    try {
        let person = null;
        if (userId) {
            person = yield getPersonByUserId(userId);
            if (!person) {
                person = yield createPerson(userId);
            }
        }
        const display = yield database_1.prisma.display.create({
            data: Object.assign({ surveyId }, (person && {
                personId: person.id,
            })),
            select: exports.selectDisplay
        });
        res.status(201).json(display);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({ error: "Database error: " + error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
});
exports.createDisplay = createDisplay;
const getDisplayByPersonId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { personId } = req.params;
    const page = parseInt(req.query.page) || 1;
    try {
        const display = yield database_1.prisma.display.findMany({
            where: {
                id: personId,
            },
            select: exports.selectDisplay,
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (page - 1),
            orderBy: {
                createdAt: "desc",
            },
        });
        if (!display) {
            res.status(404).send({ error: "Display not found" });
        }
        res.status(201).json(display);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
            res.status(500).send({ error: "Database error: " + error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
});
exports.getDisplayByPersonId = getDisplayByPersonId;
// export const deleteDisplayByResponseId = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const responseId = req.params
//     const surve
// };
