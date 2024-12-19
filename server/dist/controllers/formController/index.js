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
exports.FormController = void 0;
const error_handler_1 = require("../../utils/error-handler");
// import { validateFormInput } from "../../validators/form.validator";
const formService_1 = require("../../services/formService");
class FormController {
    static createForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formData = req.body;
                // Validate form input
                // const validationError = validateFormInput(formData);
                // if (validationError) {
                //   return res.status(400).json({ error: validationError});
                // }
                // Add user ID from authenticated request
                const form = yield formService_1.FormService.createdForm(formData);
                res.status(200).json(form);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
    static getAllForms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const forms = yield formService_1.FormService.getAllForms();
                res.json(forms);
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
                const form = yield formService_1.FormService.getFormById(id);
                res.json(form);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
    static updateForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const formData = req.body;
                const form = yield formService_1.FormService.updateForm(id, formData);
                res.json(form);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
    static deleteForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const form = yield formService_1.FormService.deleteForm(id);
                res.json(form);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
    static getUserForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                if (!userId) {
                    return res.status(400).json({ error: "User not authenticated" });
                }
                const forms = yield formService_1.FormService.getFormsByUser(userId);
                res.json(forms);
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, res);
            }
        });
    }
}
exports.FormController = FormController;
