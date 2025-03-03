import z from 'zod';
import { ZFormQuestion, ZFormThankYouCard, ZFormWelcomeCard } from './forms';

export const ZTemplateRole = z.enum(["productManager", "customerSuccess", "marketing", "sales"]);
export type TTemplateRole = z.infer<typeof ZTemplateRole>;

export const ZTemplate = z.object({
    name: z.string(),
    description: z.string(),
    icon: z.any().optional(),
    role: ZTemplateRole.optional(),
    // industries: z.array(z.enum(["eCommerce", "saas", "other"])).optional(),
    // objectives: z.array()
    preset: z.object({
        name: z.string(),
        welcomeCard: ZFormWelcomeCard,
        questions: ZFormQuestion,
        thankYouCard: ZFormThankYouCard
    }),
});

export type TTemplate = z.infer<typeof ZTemplate>;