import z from 'zod';

const Zforms = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
});

export const ZFormThankYouCard= z.object({
  enabled: z.boolean(),
  headline: z.string().optional(),
  subheader: z.string().optional(),
  buttonLabel: z.string().optional(),
  buttonLink: z.optional(z.string()),
  imageUrl: z.string().optional(),
});

export type TFormThankYouCard = z.infer<typeof ZFormThankYouCard>;


export const ZFormWelcomeCard = z
  .object({
    enabled: z.boolean(),
    headline: z.string().optional(),
    fileUrl: z.string().optional(),
    buttonLabel: z.string().optional(),
    showResponseCount: z.boolean().default(false),
  })
  .refine((schema) => !(schema.enabled && !schema.headline),{
    message: "Welcome card must have a headline",
  });

export type TFormWelcomeCard = z.infer<typeof ZFormWelcomeCard>;


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
  // createdBy: string;
  status?: 'draft' | 'scheduled' | 'inProgress' | 'paused' | 'completed';
  welcomeCard: {
    enabled: boolean;
    headline?: string;
    fileUrl?: string;
    buttonLabel?: string;
    showResponseCount: boolean;
  };
  thankYouCard: {
    enabled: boolean; 
    headline?: string;
    subheader?: string;
    buttonLabel?: string;
    buttonLink?: string;
    imageUrl?: string;
  };
}

export interface FormResponse {
  id: string;
  name: string;
  createdBy: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  welcomeCard: object;
  thankYouCard: object;
}

export interface FormUpdateInput extends Partial<FormInput> {}
