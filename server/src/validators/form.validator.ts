import z from 'zod';
import { FormInput } from '../types/forms';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    createdBy: z.string().optional(),
    status: z.enum(['draft', 'scheduled', 'inProgress', 'paused', 'completed']).optional(),
});

export const validateFormInput = (data: FormInput): string | null => {
    const result = formSchema.safeParse(data);

    if(!result.success) {
        return result.error.message;
    }

    return null;
};