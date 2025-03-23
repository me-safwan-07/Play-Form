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
exports.createAccount = void 0;
const client_1 = require("@prisma/client");
const database_1 = require("../database");
const account_1 = require("../types/account");
const account_2 = require("../utils/account");
const validate_1 = require("../utils/validate");
const errors_1 = require("../utils/errors");
const createAccount = (accountData) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.validateInputs)([accountData, account_1.ZAccountInput]);
    try {
        const supportedAccountData = (0, account_2.filterAccountInputData)(accountData);
        const account = yield database_1.prisma.account.create({
            data: supportedAccountData,
        });
        return account;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            throw new errors_1.DatabaseError(error.message);
        }
        throw error;
    }
});
exports.createAccount = createAccount;
