"use strict";
// getformcount
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
exports.createForm = exports.deleteForm = exports.updateForm = exports.getForms = exports.getForm = exports.selectForm = void 0;
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
exports.selectForm = {
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
const getForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    try {
        const form = yield database_1.prisma.form.findUnique({
            where: { id: formId },
            select: Object.assign(Object.assign({}, exports.selectForm), { creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }, products: true, responses: true, displays: true })
        });
        if (!form) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        res.status(200).json({ form });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getForm = getForm;
const getForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { page = 1, limit = 10, search = "" } = req.query;
    try {
        const skip = (Number(page) - 1) * Number(limit);
        const [forms, total] = yield Promise.all([
            database_1.prisma.form.findMany({
                where: {
                    createdBy: userId,
                    name: { contains: search, mode: 'insensitive' }
                },
                select: Object.assign(Object.assign({}, exports.selectForm), { responses: { select: { id: true } }, displays: { select: { id: true } } }),
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' }
            }),
            database_1.prisma.form.count({
                where: {
                    createdBy: userId,
                    name: { contains: search, mode: 'insensitive' }
                }
            })
        ]);
        res.status(200).json({
            forms,
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
exports.getForms = getForms;
const updateForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const userId = req.params.userId;
    const updates = req.body;
    try {
        // Verify form ownership
        const form = yield database_1.prisma.form.findFirst({
            where: {
                id: formId,
                createdBy: userId
            }
        });
        if (!form) {
            res.status(404).json({ error: "Form not found or unauthorized" });
            return;
        }
        const updatedForm = yield database_1.prisma.form.update({
            where: { id: formId },
            data: updates,
            select: exports.selectForm
        });
        res.status(200).json({ form: updatedForm });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateForm = updateForm;
const deleteForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const userId = req.params.userId;
    try {
        // Verify form ownership
        const form = yield database_1.prisma.form.findFirst({
            where: {
                id: formId,
                createdBy: userId
            }
        });
        if (!form) {
            res.status(404).json({ error: "Form not found or unauthorized" });
            return;
        }
        yield database_1.prisma.form.delete({
            where: { id: formId }
        });
        res.status(200).json({ message: "Form deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteForm = deleteForm;
const createForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const createdBy = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
    if (!createdBy) {
        res.status(401).json({ error: "Unauthorized" });
        console.log("NO created by");
        return;
    }
    const formBody = req.body;
    try {
        formBody.creator = {
            connect: {
                id: createdBy
            }
        };
        const form = yield database_1.prisma.form.create({
            data: Object.assign({}, formBody),
            select: exports.selectForm,
        });
        res.status(200).json({ form });
        next();
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(err);
            res.status(400).json({ error: "Error in creating form" });
        }
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
        next(err);
    }
});
exports.createForm = createForm;
