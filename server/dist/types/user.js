"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZUserUpdateInput = exports.ZUserCreateInput = exports.ZUser = exports.ZUserNotificationSettings = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ZUserNotificationSettings = zod_1.default.object({
    alert: zod_1.default.record(zod_1.default.boolean()),
    weeklySummary: zod_1.default.record(zod_1.default.boolean()),
    unsubscribedOrganizationIds: zod_1.default.array(zod_1.default.string()).optional(),
});
exports.ZUser = zod_1.default.object({
    id: zod_1.default.string(),
    name: zod_1.default
        .string({ message: "Name is required" })
        .trim()
        .min(1, { message: "Name should be at least 1 character long" }),
    email: zod_1.default.string().email(),
    emailVerified: zod_1.default.date().nullable(),
    imageUrl: zod_1.default.string().url().nullable(),
    // twoFactorEnabled: z.boolean(),
    identityProvider: zod_1.default.enum(["email", "google", "github", "azuread", "openid"]),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
    // role: ZRole.nullable(),
    // objective: ZUserObjective.nullable(),
    // notificationSettings: ZUserNotificationSettings,
});
exports.ZUserCreateInput = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Name is required" })
        .trim()
        .min(1, { message: "Name should be at least 1 character long" }),
    email: zod_1.default.string().email(),
    emailVerified: zod_1.default.date().optional(),
    // role: ZRole.optional(),
    // objective: ZUserObjective.nullish(),
    identityProvider: zod_1.default.enum(["email", "google", "github", "azuread", "openid"]).optional(),
    identityProviderAccountId: zod_1.default.string().optional(),
});
exports.ZUserUpdateInput = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email().optional(),
    emailVerified: zod_1.default.date().optional(),
    // role: ZRole.optional(),
    // objective: ZUserObjective.nullish().optional(),
    // twoFactorEnabled: z.boolean().optional(),
    imageUrl: zod_1.default.string().optional(),
    // notificationSettings: ZUserNotificationSettings.optional(),
});
