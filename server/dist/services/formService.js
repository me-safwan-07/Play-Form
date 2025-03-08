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
exports.getForm = exports.selectForm = void 0;
const database_1 = require("../database");
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
const getForm = (formId_1, ...args_1) => __awaiter(void 0, [formId_1, ...args_1], void 0, function* (formId, userId = "") {
    if (!formId || !userId) {
        throw new Error("All fields as required");
    }
    const form = yield database_1.prisma.form.findUnique({
        where: {
            id: formId,
            createdBy: userId,
        },
        select: exports.selectForm
    });
    return form;
});
exports.getForm = getForm;
