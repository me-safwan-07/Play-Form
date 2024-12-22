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
exports.ResponseController = void 0;
const responseService_1 = require("../services/responseService");
const responses_1 = require("../types/responses");
const error_handler_1 = require("../utils/error-handler");
const database_1 = require("../database");
class ResponseController {
    static createResponse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseData = req.body;
                // Validate form input
                // const validationError = validateFormInput(formData);
                // if (validationError) {
                //   return res.status(400).json({ error: validationError});
                // }
                const validationError = responses_1.ZResponseInput.safeParse(responseData);
                if (validationError.error) {
                    return res.status(400).json({ error: validationError.error.message });
                }
                // Add user ID from authenticated request
                const formExists = yield database_1.prisma.form.findUnique({
                    where: {
                        id: responseData.formId,
                    },
                });
                if (!formExists) {
                    return res.status(400).json({ error: 'Form does not exist' });
                }
                const response = yield responseService_1.ResponseService.createdResponse(responseData);
                res.status(200).json(response);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
    static getAllResponses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resposes = yield responseService_1.ResponseService.getAllResponse();
                res.json(resposes);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
    static getFormById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const form = yield responseService_1.ResponseService.getResponseById(id);
                res.json(form);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
}
exports.ResponseController = ResponseController;
