import { response } from "express";
import { z } from "zod";

export const ZDisplay = z.object({
    id: z.string().cuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    formid: z.string().cuid(),
    responseId: z.string().cuid().nullable(),
    status: z.enum(['seen', 'responded']).nullable(),
});

export type TDisplay = z.infer<typeof ZDisplay>;

export const ZDisplayCreateInput = z.object({
    formId: z.string().cuid(),
    responseId: z.string().cuid().optional(),
});

export type TDisplayCreateInput = z.infer<typeof ZDisplayCreateInput>;