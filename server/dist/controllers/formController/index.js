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
exports.createForm = exports.deleteForm = exports.getFormCount = exports.getForms = exports.getForm = exports.selectForm = void 0;
const database_1 = require("../../database");
const client_1 = require("@prisma/client");
const formsUtils_1 = require("../../utils/formsUtils");
exports.selectForm = {
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    type: true,
    environmentId: true,
    status: true,
    welcomeCard: true,
    questions: true,
    thankYouCard: true,
    displayLimit: true,
    autoClose: true,
    runOnDate: true,
    closeOnDate: true,
    delay: true,
    displayPercentage: true,
    autoComplete: true,
    verifyEmail: true,
    redirectUrl: true,
    styling: true,
    surveyClosedMessage: true,
    resultShareKey: true,
};
const getForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    let formPrisma;
    try {
        formPrisma = yield database_1.prisma.form.findUnique({
            where: {
                id: formId
            },
            select: exports.selectForm
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error);
            res.status(400).json({ error: "Database error" });
        }
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    if (!formPrisma) {
        res.status(404).json({ error: "Form not found" });
        return;
    }
    const form = (0, formsUtils_1.transformPrismaSurvey)(formPrisma);
    res.status(200).json({ form });
});
exports.getForm = getForm;
const getForms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const environmentId = req.params.environmentId;
    const { limit, offset, filterCriteria } = req.body;
    let formsPrisma;
    try {
        formsPrisma = yield database_1.prisma.form.findMany({
            where: Object.assign({ environmentId: environmentId }, (0, formsUtils_1.buildWhereClause)(filterCriteria)),
            select: exports.selectForm,
            orderBy: (0, formsUtils_1.buildOrderByClause)(filterCriteria.sortBy),
            take: limit ? limit : undefined,
            skip: offset ? offset : undefined
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error);
            res.status(400).json({ error: "Database error" });
        }
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
    const forms = [];
    if (formsPrisma) {
        for (const formPrisma of formsPrisma) {
            const transformedSurvey = (0, formsUtils_1.transformPrismaSurvey)(formPrisma);
            forms.push(transformedSurvey);
        }
    }
    res.status(200).json({ forms });
    next();
});
exports.getForms = getForms;
const getFormCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const environmentId = req.params.environmentId;
        const formcount = yield database_1.prisma.form.count({
            where: {
                environmentId: environmentId
            }
        });
        res.status(200).json({ formcount });
        next();
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(error);
            res.status(400).json({ error: "Error in getting form count" });
        }
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
        next(error);
    }
});
exports.getFormCount = getFormCount;
// export const updateForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { updatedForm } = req.body;
//   try {
//     const formId = updatedForm.id;
//     let data: any = {};
//     const currentForm = ;
//   }
// };
const deleteForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    try {
        yield database_1.prisma.form.delete({
            where: {
                id: formId
            },
            select: exports.selectForm
        });
        res.status(200).json({ message: "Form deleted successfully" });
        next();
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            console.log(err);
            res.status(400).json({ error: "Error in deleting form" });
        }
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
        next(err);
    }
});
exports.deleteForm = deleteForm;
const createForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { environmentId } = req.params;
    const { formBody } = req.body;
    try {
        const form = yield database_1.prisma.form.create({
            data: Object.assign(Object.assign({}, formBody), { environment: {
                    connect: {
                        id: environmentId
                    }
                } }),
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
    ;
});
exports.createForm = createForm;
