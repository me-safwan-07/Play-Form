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
exports.updateResponse = exports.createResponse = exports.getResponses = void 0;
const database_1 = require("../../database");
const getResponses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const { page = 1, limit = 10 } = req.query;
    try {
        const skip = (Number(page) - 1) * Number(limit);
        const [responses, total] = yield Promise.all([
            database_1.prisma.response.findMany({
                where: { formId },
                include: {
                    notes: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                },
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' }
            }),
            database_1.prisma.response.count({ where: { formId } })
        ]);
        res.status(200).json({
            responses,
            pagination: {
                total,
                pages: Math.ceil(total / Number(limit)),
                page: Number(page),
                limit: Number(limit)
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getResponses = getResponses;
const createResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const responseData = req.body;
    try {
        const response = yield database_1.prisma.response.create({
            data: Object.assign(Object.assign({}, responseData), { formId }),
            include: {
                notes: true
            }
        });
        res.status(201).json({ response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createResponse = createResponse;
const updateResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responseId = req.params.responseId;
    const updates = req.body;
    try {
        const response = yield database_1.prisma.response.update({
            where: { id: responseId },
            data: updates,
            include: {
                notes: true
            }
        });
        res.status(200).json({ response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateResponse = updateResponse;
