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
exports.getForm = exports.selectSurvey = void 0;
const database_1 = require("../../database");
exports.selectSurvey = {
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
};
const getForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formId = req.params.formId;
    let formPrisma;
    try {
        formPrisma = yield database_1.prisma.form.findUnique({
            where: {
                id: formId,
            },
            select: exports.selectSurvey,
        });
        if (!formPrisma) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        res.status(200).json(formPrisma);
    }
    finally {
    }
});
exports.getForm = getForm;
// Generated by Qodo Gen
describe('getForm', () => {
    // Successfully retrieve form data when valid formId is provided
    it('should return form data with status 200 when valid formId is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockForm = {
            id: '123',
            title: 'Test Form'
        };
        const req = {
            params: {
                formId: '123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        jest.spyOn(database_1.prisma.form, 'findUnique').mockResolvedValue(mockForm);
        yield (0, exports.getForm)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockForm);
    }));
});