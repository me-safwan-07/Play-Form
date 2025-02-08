import { z } from "zod";

export const ZResponseDataValue = z.union([
    z.string(),
    z.number(),
    z.array(z.string()),
    z.record(z.string()),
]);

export type TResponseDataValue = z.infer<typeof ZResponseDataValue>;

export const ZResponseData = z.record(ZResponseDataValue);

export type TResponseData = z.infer<typeof ZResponseData>;

