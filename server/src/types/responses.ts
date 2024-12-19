import { z } from "zod"

export const ZResponseDataValue = z.union([
  z.string(),
  z.number(),
  z.array(z.string()),
  z.record(z.string()),
]);

export type TResponseDataValue = z.infer<typeof ZResponseDataValue>;

export const ZResponseData = z.record(ZResponseDataValue);

export const ZResponseTtc = z.record(z.number());

export const ZResponseInput = z.object({
    // createdAt: z.coerce.date().optional(),
    // updatedAt: z.coerce.date().optional(),
    finished: z.boolean(),
    // formId: z.string().cuid2(),
    // data: ZResponseData,
    // ttc: ZResponseTtc.optional(),
    // meta: z
    //     .object({
    //         source: z.string().optional(),
    //         url: z.string().optional(),
    //         action: z.string().optional(),
    //     }).optional(),
});

export type TResponseInput = z.infer<typeof ZResponseInput>;