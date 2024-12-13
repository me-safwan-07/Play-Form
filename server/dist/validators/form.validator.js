"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFormInput = void 0;
const zod_1 = __importDefault(require("zod"));
const formSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Name is required').max(255),
    createdBy: zod_1.default.string().optional(),
    status: zod_1.default.enum(['draft', 'scheduled', 'inProgress', 'paused', 'completed']).optional(),
});
const validateFormInput = (data) => {
    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.message;
    }
    return null;
};
exports.validateFormInput = validateFormInput;
