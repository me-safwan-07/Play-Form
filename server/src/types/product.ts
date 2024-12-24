import { z } from "zod";
import { ZPlacement } from "./common";

export const ZLogo = z.object({
    url: z.string().optional(),
    bgColor: z.string().optional(),
});

export const ZProduct = z.object({
    id: z.string().cuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string().trim().min(1, { message: "Product name cannot be empty" }),
    formId: z.string(),
    // styling:,
    recontactDays: z
        .number({ message: "Recontact day is required"})
        .int()
        .min(0, { message: "Must be a positive number" })
        .max(365, { message: "Must be less than 365" }),
    // linkFormBranding: z.boolean();
    placement: ZPlacement,
    clickOutsideClose: z.boolean(),
    darkOverlay: z.boolean(),
    logo: ZLogo.nullish(),
     
});