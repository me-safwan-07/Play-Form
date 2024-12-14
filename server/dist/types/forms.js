"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZFormInput = exports.ZFormStatus = void 0;
const zod_1 = __importDefault(require("zod"));
const Zforms = zod_1.default.object({
    id: zod_1.default.string().cuid2(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
    name: zod_1.default.string(),
});
exports.ZFormStatus = zod_1.default.enum(["draft", "scheduled", "inProgress", "paused", "completed"]);
exports.ZFormInput = zod_1.default.object({
    name: zod_1.default.string(),
    createdBy: zod_1.default.string(),
    status: exports.ZFormStatus.optional(),
});
