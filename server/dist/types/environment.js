"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZId = exports.ZEnvironmentCreateInput = exports.ZEnvironmentUpdateInput = exports.ZEnvironmentId = exports.ZEnvironment = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ZEnvironment = zod_1.default.object({
    id: zod_1.default.string().cuid2(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
    type: zod_1.default.enum(["development", "production"]),
    productId: zod_1.default.string(),
});
exports.ZEnvironmentId = zod_1.default.object({
    id: zod_1.default.string(),
});
exports.ZEnvironmentUpdateInput = zod_1.default.object({
    type: zod_1.default.enum(["development", "production"]),
    productId: zod_1.default.string(),
});
exports.ZEnvironmentCreateInput = zod_1.default.object({
    type: zod_1.default.enum(['development', "production"]).optional(),
});
exports.ZId = zod_1.default.string().cuid2();
