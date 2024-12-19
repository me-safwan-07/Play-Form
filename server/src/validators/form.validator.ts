import z, { Schema } from 'zod';
import { FormInput } from '../types/forms';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    // createdBy: z.string().optional(),
    status: z.enum(['draft', 'scheduled', 'inProgress', 'paused', 'completed']).optional(),
    welcomeCard: z.object({
        enabled: z.boolean(),
        headline: z.string().optional(),
        fileurl: z.string().optional(),
        buttonLabel: z.string().optional(),
        showResponseCount: z.boolean().optional(),
    }).refine((schema) => !(schema.enabled && !schema.headline), {
        message: 'Welcome card must have a headline',
    })
});

export const validateFormInput = (data: FormInput): string | null => {
    const result = formSchema.safeParse(data);

    if(!result.success) {
        return result.error.message;
    }

    return null;
};