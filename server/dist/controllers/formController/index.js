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
exports.getFormCount = exports.createForm = exports.deleteForm = exports.updateForm = exports.getForms = exports.getForm = exports.selectForm = void 0;
// import mongoose from "mongoose";
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
const formsUtils_1 = require("../../utils/formsUtils");
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
const getForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const formId = req.params.formId;
    if (!formId) {
        console.log("No formId");
        res.status(404).json({ error: "Form not found" });
        return;
    }
    try {
        const form = yield database_1.prisma.form.findUnique({
            where: {
                id: formId,
                createdBy: userId
            },
            select: exports.selectForm,
        });
        if (!form) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        res.status(200).json({ form, userId });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.error(error.message);
            res.status(404).json({ error: "Form not found" });
            next(error);
        }
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
});
exports.getForm = getForm;
const getForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const { limit, offset, filterCriteria } = req.query;
    try {
        const filters = typeof filterCriteria === 'string' ? JSON.parse(filterCriteria) : {};
        const forms = yield database_1.prisma.form.findMany({
            where: Object.assign({ createdBy: userId }, (0, formsUtils_1.buildWhereClause)(filters)),
            select: exports.selectForm,
            orderBy: (0, formsUtils_1.buildOrderByClause)(filters.sortBy),
            take: limit ? Number(limit) : undefined,
            skip: offset ? Number(offset) : undefined
        });
        res.status(200).json({ forms });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getForms = getForms;
const updateForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const userId = req.user;
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
    const userId = req.user;
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
const getFormCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    try {
        const formCount = yield database_1.prisma.form.count({
            where: {
                createdBy: userId
            }
        });
        if (!formCount) {
            res.status(200).json({ count: 0 });
            return;
        }
        res.status(200).json({ count: formCount });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
});
exports.getFormCount = getFormCount;
