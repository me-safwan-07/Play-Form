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
exports.FormService = void 0;
const database_1 = require("../database");
const errors_1 = require("../utils/errors");
class FormService {
    static createdForm(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.form.create({
                data: {
                    name: data.name,
                    // createdBy: data.createdBy,
                    status: data.status || 'draft',
                    welcomeCard: data.welcomeCard,
                    thankYouCard: data.thankYouCard,
                },
            });
        });
    }
    static getAllForms() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.form.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });
        });
    }
    static getFormById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = yield database_1.prisma.form.findUnique({
                where: { id },
            });
            if (!form) {
                throw new errors_1.NotFoundError('Form not found');
            }
            return form;
        });
    }
    static updateForm(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = yield database_1.prisma.form.findUnique({
                where: { id },
            });
            if (!form) {
                throw new errors_1.NotFoundError('Form not found');
            }
            return database_1.prisma.form.update({
                where: { id },
                data,
            });
        });
    }
    static deleteForm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = yield database_1.prisma.form.findUnique({
                where: { id },
            });
            if (!form) {
                throw new errors_1.NotFoundError('Form not found');
            }
            return database_1.prisma.form.delete({
                where: { id },
            });
        });
    }
    static getFormsByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.form.findMany({
                where: { id },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        });
    }
}
exports.FormService = FormService;
