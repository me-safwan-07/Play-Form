"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZProduct = exports.ZLogo = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
exports.ZLogo = zod_1.z.object({
    url: zod_1.z.string().optional(),
    bgColor: zod_1.z.string().optional(),
});
exports.ZProduct = zod_1.z.object({
    id: zod_1.z.string().cuid(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    name: zod_1.z.string().trim().min(1, { message: "Product name cannot be empty" }),
    formId: zod_1.z.string(),
    // styling:,
    recontactDays: zod_1.z
        .number({ message: "Recontact day is required" })
        .int()
        .min(0, { message: "Must be a positive number" })
        .max(365, { message: "Must be less than 365" }),
    // linkFormBranding: z.boolean();
    placement: common_1.ZPlacement,
    clickOutsideClose: zod_1.z.boolean(),
    darkOverlay: zod_1.z.boolean(),
    logo: exports.ZLogo.nullish(),
});
