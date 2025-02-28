import { finished } from "stream";
import { boolean, z } from "zod";

export const ZResponseDataValue = z.union([
    z.string(),
    z.number(),
    z.array(z.string()),
    z.record(z.string()),
]);

export type TResponseDataValue = z.infer<typeof ZResponseDataValue>;

export const ZResponseData = z.record(ZResponseDataValue);

export type TResponseData = z.infer<typeof ZResponseData>;

export const ZResponseHiddenFieldValue = z.record(z.union([z.string(), z.number(), z.array(z.string())]));
export type TResponseHiddenFieldValue = z.infer<typeof ZResponseHiddenFieldValue>;

export const ZResponseUpdate = z.object({
    finished: z.boolean(),
    data: ZResponseData,
    meta: z
        .object({
            url: z.string().optional(),
            soruce: z.string().optional(),
            action: z.string().optional(),
        })
        .optional(),
    hiddenFields: ZResponseHiddenFieldValue.optional(), 
});

export type TResponseUpdate = z.infer<typeof ZResponseUpdate>;

