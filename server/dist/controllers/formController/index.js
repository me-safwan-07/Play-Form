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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateForm = exports.getFormCount = exports.createForm = exports.deleteForm = exports.updateForm = exports.getForms = exports.getForm = exports.selectForm = void 0;
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
const formsUtils_1 = require("../../utils/formsUtils");
const structuredClone_1 = require("../../utils/pollyfills/structuredClone");
const validate_1 = require("../../utils/validate");
const environment_1 = require("../../types/environment");
const cache_1 = require("../../config/cache");
const cache_2 = require("./cache");
exports.selectForm = {
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    environmentId: true,
    createdBy: true,
    status: true,
    welcomeCard: true,
    questions: true,
    thankYouCard: true,
    displayOptions: true,
    recontactDays: true,
    displayLimit: true,
    autoClose: true,
    runOnDate: true,
    closeOnDate: true,
    delay: true,
    displayPercentage: true,
    autoComplete: true,
    verifyEmail: true,
    redirectUrl: true,
    productOverwrites: true,
    styling: true,
    surveyClosedMessage: true,
    singleUse: true,
    pin: true,
    resultShareKey: true,
    segment: {
        include: {
            forms: {
                select: {
                    id: true,
                },
            },
        },
    },
};
const getForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const userId = req.user;
    (0, cache_1.cache)(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, validate_1.validateInputs)([formId, environment_1.ZId]);
        let formPrisma;
        try {
            formPrisma = yield database_1.prisma.form.findUnique({
                where: {
                    id: formId,
                    createdAt: userId
                },
                select: exports.selectForm,
            });
            if (!database_1.prisma) {
                res.status(404).json({ message: "Form not found" });
            }
            const form = (0, formsUtils_1.transformPrismaSurvey)(formPrisma);
            res.status(200).json({ form });
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
    }), `getForm-${formId}`, {
        tag: [cache_2.formCache.tag.byId(formId)]
    })();
});
exports.getForm = getForm;
const getForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { limit, offset, filterCriteria } = req.query;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    let formsPrisma;
    try {
        const filters = typeof filterCriteria === 'string' ? JSON.parse(filterCriteria) : {};
        // ✅ Correct way to use cache with async/await
        formsPrisma = yield (0, cache_1.cache)(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield database_1.prisma.form.findMany({
                where: Object.assign({ createdBy: userId }, (0, formsUtils_1.buildWhereClause)(filters)),
                select: exports.selectForm,
                orderBy: (0, formsUtils_1.buildOrderByClause)(filters === null || filters === void 0 ? void 0 : filters.sortBy),
                take: limit ? Number(limit) : undefined,
                skip: offset ? Number(offset) : undefined,
            });
        }), `getForms-${limit}-${offset}-${JSON.stringify(filterCriteria)}`, {
            tag: [cache_2.formCache.tag.byEnvironementId(userId)],
        })();
        if (!formsPrisma) {
            res.status(404).json({ error: "No forms found" });
            return;
        }
        const form = [];
        for (const formPrisma of formsPrisma) {
            const transformedForm = (0, formsUtils_1.transformPrismaSurvey)(formPrisma);
            form.push(transformedForm);
        }
        res.status(200).json(form);
    }
    catch (error) {
        console.error("Error fetching forms:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(500).json({ error: "Database error occurred" });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.getForms = getForms;
const updateForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    const userId = req.userId;
    const updatedForm = req.body.updatedForm;
    // console.log("Received updated form:", updatedForm);
    try {
        // Verify form ownership
        const form = yield database_1.prisma.form.findFirst({
            where: {
                createdBy: userId,
                id: formId
            }
        });
        if (!form) {
            res.status(404).json({ error: "Form not found or unauthorized" });
            return;
        }
        // Fix: Use updatedForm instead of updateForm (which was undefined)
        const data = Object.assign(Object.assign({}, updatedForm), { updatedAt: new Date() });
        // Handle status changes
        if (data.status === 'scheduled' && data.runOnDate === null) {
            data.status = 'inProgress';
        }
        if ((data.status === 'completed' || data.status === 'paused' || data.status === 'inProgress') &&
            data.runOnDate &&
            data.runOnDate > new Date()) {
            data.status = 'scheduled';
        }
        // Remove any properties that shouldn't be updated directly
        const { id, createdAt, createdBy } = data, updateData = __rest(data, ["id", "createdAt", "createdBy"]);
        const modifiedForm = yield database_1.prisma.form.update({
            where: {
                id: formId
            },
            data: updateData,
            select: exports.selectForm
        });
        res.status(200).json({ form: modifiedForm });
    }
    catch (error) {
        console.error("Update error:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(404).json({ error: "Form not found" });
        }
        else {
            res.status(500).json({ error: "Internal Server Error" });
        }
        next(error);
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
        console.log(form);
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
const duplicateForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const environmentId = req.params.environmentId;
    const formId = req.body.formId;
    const userId = req.userId;
    (0, validate_1.validateInputs)([environmentId, environment_1.ZId], [formId, environment_1.ZId]);
    try {
        const existingForm = yield database_1.prisma.form.findUnique({
            where: { id: formId }
        });
        const currentDate = new Date();
        if (!existingForm) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        const { id, createdBy, environmentId, segmentId } = existingForm, formDataToCopy = __rest(existingForm, ["id", "createdBy", "environmentId", "segmentId"]);
        const duplicateForm = yield database_1.prisma.form.create({
            data: Object.assign(Object.assign({}, formDataToCopy), { createdAt: currentDate, updatedAt: currentDate, name: `${existingForm.name} (Copy)`, status: "draft", questions: existingForm.questions, welcomeCard: existingForm.welcomeCard, thankYouCard: existingForm.thankYouCard, environment: {
                    connect: {
                        id: environmentId
                    },
                }, creator: {
                    connect: {
                        id: userId
                    }
                }, formClosedMessage: existingForm.formClosedMessage
                    ? (0, structuredClone_1.structuredClone)(existingForm.formClosedMessage)
                    : undefined, singleUse: existingForm.singleUse ? (0, structuredClone_1.structuredClone)(existingForm.singleUse) : undefined, productOverwrites: existingForm.productOverwrites
                    ? (0, structuredClone_1.structuredClone)(existingForm.productOverwrites)
                    : undefined, styling: existingForm.styling ? (0, structuredClone_1.structuredClone)(existingForm.styling) : undefined, verifyEmail: existingForm.verifyEmail
                    ? (0, structuredClone_1.structuredClone)(existingForm.verifyEmail)
                    : undefined, 
                // we'll update the segment later
                segment: undefined }),
        });
        // if the existing form has an inline segment, we copy the filters and create a new inline segment and connect it to the new form
        // if (existingForm.)
        res.status(200).json({ form: duplicateForm });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
});
exports.duplicateForm = duplicateForm;
