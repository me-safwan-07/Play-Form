import { Prisma } from '@prisma/client';
import prisma from '../../prisma/index.js';
import { DatabaseError } from '../validations/error.validations.js';
import { validateInputs } from '../utils/validate.js';
import { JAccountInput } from '../validations/account.validations.js';

export const createAccount = async (accountData) => {
    validateInputs([accountData, JAccountInput]);
    
    try {
        const account = await prisma.account.create({
            data: accountData,
        });
    
        return account;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new DatabaseError(error.message);
        }
    
        throw error;
    }
};