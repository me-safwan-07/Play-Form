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
exports.ResponseService = void 0;
const database_1 = require("../database");
const errors_1 = require("../utils/errors");
const responseSelection = {
    id: true,
    createdAt: true,
    updatedAt: true,
    finished: true,
    formId: true,
};
class ResponseService {
    static createdResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prismaData = {
                    form: {
                        connect: {
                            id: data.formId,
                        },
                    },
                    finished: data.finished,
                };
                return yield database_1.prisma.response.create({
                    data: prismaData,
                    select: responseSelection
                });
            }
            catch (error) {
                // if (error.code === 'P2002') {
                //   throw new Error('A response with the same surveyId and singleUseId already exists.');
                // }
                console.error(error);
                throw error;
            }
        });
    }
    ;
    static getAllResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.response.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                select: responseSelection
            });
        });
    }
    static getResponseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.prisma.response.findUnique({
                where: { id },
                select: responseSelection
            });
            if (!response) {
                throw new errors_1.NotFoundError('Response not found');
            }
            return response;
        });
    }
}
exports.ResponseService = ResponseService;
