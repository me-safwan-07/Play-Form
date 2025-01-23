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
exports.createForm = exports.selectForm = void 0;
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
// export const getForm = async (req: Request, res: Response): Promise<void> => {
//   const formId = req.params.formId;
//   let formPrisma;
//   try {
//     formPrisma = await prisma.form.findUnique({
//       where: {
//         id: formId
//       },
//       select: selectForm
//     });
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       console.log(error);
//       res.status(400).json({ error: "Database error" });
//     }
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
//   if (!formPrisma) {
//     res.status(404).json({ error: "Form not found" });
//     return;
//   }
//   const form: TForm = transformPrismaSurvey(formPrisma);
//   res.status(200).json({ form });
// }
// export const getForms = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const environmentId = req.params.environmentId;
//   const { limit, offset, filterCriteria} = req.body;
//   let formsPrisma;
//   try {
//     formsPrisma = await prisma.form.findMany({
//       where: {
//         environmentId: environmentId,
//         ...buildWhereClause(filterCriteria),
//       },
//       select: selectForm,
//       orderBy: buildOrderByClause(filterCriteria.sortBy),
//       take: limit ? limit : undefined,
//       skip: offset ? offset : undefined
//     });
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       console.log(error);
//       res.status(400).json({ error: "Database error" });
//     }
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//     next(error);
//   }
//   const forms: TForm[] = [];
//   if (formsPrisma) {
//     for (const formPrisma of formsPrisma) {
//       const transformedSurvey = transformPrismaSurvey(formPrisma);
//       forms.push(transformedSurvey);
//     }
//   }
//   res.status(200).json({ forms });
//   next();
// }
// export const getFormCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const environmentId: string = req.params.environmentId;
//       const formcount = await prisma.form.count({
//         where: {
//           environmentId: environmentId
//         }
//       });
//       res.status(200).json({ formcount });
//       next();
//     } catch (error) {
//       if (error instanceof Prisma.PrismaClientKnownRequestError) {
//         console.log(error);
//         res.status(400).json({ error: "Error in getting form count" });
//     }
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//     next(error);
//   }
// };
// export const updateForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { updatedForm } = req.body;
//   try {
//     const formId = updatedForm.id;
//     let data: any = {};
//     const currentForm = ;
//   }
// };
// export const deleteForm = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const formId = req.params.formId;
//   try {
//     await prisma.form.delete({
//       where: {
//         id: formId
//       },
//       select: selectForm
//     });
//     res.status(200).json({ message: "Form deleted successfully" });
//     next();
//   } catch (err) {
//     if (err instanceof Prisma.PrismaClientKnownRequestError) {
//       console.log(err);
//       res.status(400).json({ error: "Error in deleting form" });
//     }
//     res.status(500).json({ error: "Internal Server Error" });
//     next(err);
//   }
// };
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
