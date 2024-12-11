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
exports.getSurvey = exports.selectSurvey = void 0;
const client_1 = require("@prisma/client");
const errors_1 = require("../types/errors"); // Custom error class
const formsUtils_1 = require("../utils/formsUtils"); // Utility functions
const database_1 = require("../database");
const validate_1 = require("../utils/validate");
const environment_1 = require("../types/environment");
exports.selectSurvey = {
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    createdBy: true,
};
const getSurvey = (surveyId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.validateInputs)([surveyId, environment_1.ZId]);
    let surveyPrisma;
    try {
        surveyPrisma = yield database_1.prisma.form.findUnique({
            where: {
                id: surveyId,
            },
            select: exports.selectSurvey,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new errors_1.DatabaseError(error.message);
        }
        throw error;
    }
    if (!surveyPrisma) {
        return null;
    }
    return (0, formsUtils_1.transformPrismaSurvey)(surveyPrisma);
});
exports.getSurvey = getSurvey;
// export const createForm = async (environmentId: string, formBody: TFormInput): Promise<TForm> => {
//   validateInputs([environmentId, ZId]);
//   try {
//     const createdBy = formBody.createdBy;
//     // delete createdBy;
//     const survey = await prisma.form.create({
//       data: {
//         ...formBody.data,
//         environment: {
//           connect: {
//             id: environmentId,
//           },
//         },
//       },
//       select: selectSurvey,
//     });
//     return transformPrismaSurvey(survey);
//   }
// }
