import { z } from "zod";
import { ZBaseStyling } from "./styling";
import { ZColor } from "./common";

export const ZProductStyling = ZBaseStyling.extend({
    allowStyleOverwrite: z.boolean(),
});

export type TProductStyling = z.infer<typeof ZProductStyling>;

export const ZProductConfig = z.enum(["Cricket", "Football", "VallyBall", "Kabbadi"]).nullable();
export type TProductConfig = z.infer<typeof ZProductConfig>;

export const ZLogo = z.object({
    url: z.string().optional(),
    bgColor: z.string().optional()
});

export type TLogo = z.infer<typeof ZLogo>;

export const ZProduct = z.object({
    id: z.string().cuid2(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string().trim().min(1, { message: "Product name cannot be empty" }),
    styling: ZProductStyling,
    recontactDays: z
        .number({ message: "Recontact days is required" })
        .int()
        .min(0, { message: "Must be a positive number" })
        .max(365, { message: "Must be less than 365" }),
    config: ZProductConfig,
    darkOverlay: z.boolean(),
    environmentId:  z.string(),
    logo: ZLogo.nullish(),
});

export type TProduct = z.infer<typeof ZProduct>;

export const ZProductLegacy = z.object({
    id: z.string().cuid2(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string().trim().min(1, { message: "Product name cannot be empty" }),
    styling: ZProductStyling,
    recontactDays: z
        .number({ message: "Recontact days is required" })
        .int()
        .min(0, { message: "Must be a positive number" })
        .max(365, { message: "Must be less than 365" }),
    config: ZProductConfig,
    darkOverlay: z.boolean(),
    environmentId:  z.string(),
    brandColor: ZColor.nullish(),
    highlightBorderColor: ZColor.nullish(),
    logo: ZLogo.nullish(),
});

export type TProductLegacy = z.infer<typeof ZProductLegacy>;

export const ZProductUpdateInput = z.object({
    name: z.string().trim().min(1, { message: "Product name cannot be empty" }),
    highlightBorderColor: ZColor.nullish(),
    styling: ZProductStyling,
    recontactDays: z.number().int().optional(),
    config: ZProductConfig.optional(),
    darkOverlay: z.boolean().optional(),
    environmentId:  z.string().optional(),
    logo: ZLogo.optional(),
});

export type TProductUpdateInput = z.infer<typeof ZProductUpdateInput>;

