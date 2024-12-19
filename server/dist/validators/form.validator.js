"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFormInput = void 0;
const zod_1 = __importDefault(require("zod"));
const formSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, 'Name is required').max(255),
    // createdBy: z.string().optional(),
    status: zod_1.default.enum(['draft', 'scheduled', 'inProgress', 'paused', 'completed']).optional(),
    welcomeCard: zod_1.default.object({
        enabled: zod_1.default.boolean(),
        headline: zod_1.default.string().optional(),
        fileurl: zod_1.default.string().optional(),
        buttonLabel: zod_1.default.string().optional(),
        showResponseCount: zod_1.default.boolean().optional(),
    }).refine((schema) => !(schema.enabled && !schema.headline), {
        message: 'Welcome card must have a headline',
    })
});
const validateFormInput = (data) => {
    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.message;
    }
    return null;
};
exports.validateFormInput = validateFormInput;
