import z from 'zod';

const Zforms = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
})

export type TForm = z.infer<typeof Zforms>;

export const ZFormStatus = z.enum(["draft", "scheduled", "inProgress", "paused", "completed"]);

export const ZFormInput = z.object({
  name: z.string(),
  createdBy: z.string(),
  status: ZFormStatus.optional(),
});

export type TFormInput = z.infer<typeof ZFormInput>;

export interface FormInput {
  name: string;
  createdBy: string;
  status?: 'draft' | 'scheduled' | 'inProgress' | 'paused' | 'completed';
}

export interface FormResponse {
  id: string;
  name: string;
  createdBy: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormUpdateInput extends Partial<FormInput> {}
