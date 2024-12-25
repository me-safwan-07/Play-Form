"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZDisplayCreateInput = exports.ZDisplay = void 0;
const zod_1 = require("zod");
exports.ZDisplay = zod_1.z.object({
    id: zod_1.z.string().cuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    formid: zod_1.z.string().cuid(),
    responseId: zod_1.z.string().cuid().nullable(),
    status: zod_1.z.enum(['seen', 'responded']).nullable(),
});
exports.ZDisplayCreateInput = zod_1.z.object({
    formId: zod_1.z.string().cuid(),
    responseId: zod_1.z.string().cuid().optional(),
});
