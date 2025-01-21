import { z } from "zod";

export const ZEnvironment = z.object({
    id:z.string().cuid2(),
    createdAt:z.date(),
    updatedAt:z.date(),
});

export type TEnvironment = z.infer<typeof ZEnvironment>;