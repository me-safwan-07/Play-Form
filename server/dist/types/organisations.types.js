"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZOrganization = void 0;
const zod_1 = require("zod");
exports.ZOrganization = zod_1.z.object({
    id: zod_1.z.string().cuid2(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    name: zod_1.z.string({ message: "Organization name is required" }).trim().min(1, {
        message: "Organization name must be at least 1 character long",
    }),
});
