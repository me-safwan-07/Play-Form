"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZAccount = exports.ZAccountInput = void 0;
const zod_1 = require("zod");
exports.ZAccountInput = zod_1.z.object({
    userId: zod_1.z.string(),
    type: zod_1.z.string(),
    provider: zod_1.z.string(),
    providerAccountId: zod_1.z.string(),
    access_token: zod_1.z.string().nullish(),
    refresh_token: zod_1.z.string().nullish(),
    expires_at: zod_1.z.number().nullish(),
    scope: zod_1.z.string().nullish(),
    token_type: zod_1.z.string().nullish(),
    id_token: zod_1.z.string().nullish(),
});
exports.ZAccount = zod_1.z.object({
    id: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    userId: zod_1.z.string(),
    type: zod_1.z.string(),
    provider: zod_1.z.string(),
    providerAccountId: zod_1.z.string(),
    access_token: zod_1.z.string().nullable(),
    refresh_token: zod_1.z.string().nullable(),
    expires_at: zod_1.z.number().nullable(),
    scope: zod_1.z.string().nullable(),
    token_type: zod_1.z.string().nullable(),
    id_token: zod_1.z.string().nullable(),
});
