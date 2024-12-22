"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZResponseInput = exports.ZResponseTtc = exports.ZResponseData = exports.ZResponseDataValue = void 0;
const zod_1 = require("zod");
exports.ZResponseDataValue = zod_1.z.union([
    zod_1.z.string(),
    zod_1.z.number(),
    zod_1.z.array(zod_1.z.string()),
    zod_1.z.record(zod_1.z.string()),
]);
exports.ZResponseData = zod_1.z.record(exports.ZResponseDataValue);
exports.ZResponseTtc = zod_1.z.record(zod_1.z.number());
exports.ZResponseInput = zod_1.z.object({
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
    finished: zod_1.z.boolean(),
    formId: zod_1.z.string().cuid2(),
    // data: ZResponseData,
    // ttc: ZResponseTtc.optional(),
    // meta: z
    //     .object({
    //         source: z.string().optional(),
    //         url: z.string().optional(),
    //         action: z.string().optional(),
    //     }).optional(),
});
