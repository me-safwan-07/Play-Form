import z from 'zod';

const Zforms = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
})

export type TForm = z.infer<typeof Zforms>;

export const ZFormInput = z.object({
  name: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
});

export type TFormInput = z.infer<typeof ZFormInput>;