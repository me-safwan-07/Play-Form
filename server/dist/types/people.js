"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZPerson = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ZPerson = zod_1.default.object({
    id: zod_1.default.string().cuid2(),
    userId: zod_1.default.string(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
    //   environmentId: z.string().cuid2(),
});
