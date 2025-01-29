import z from "zod"

export const ZProduct = z.object({
    name: z.string().trim().min(1, { message: "Product name cannot be empty" })
});

export type TProduct = z.infer<typeof ZProduct>