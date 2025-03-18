import { Prisma } from "@prisma/client";
import { prisma } from "../database";
import { TAccount, TAccountInput, ZAccountInput } from "../types/account";
import { filterAccountInputData } from "../utils/account";
import { validateInputs } from "../utils/validate";
import { DatabaseError } from "../utils/errors";

export const createAccount = async (accountData: TAccountInput): Promise<TAccount> => {
    validateInputs([accountData, ZAccountInput]);

    try {
        const supportedAccountData = filterAccountInputData(accountData);
        const account = await prisma.account.create({
            data: supportedAccountData,
        });
        return account;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new DatabaseError(error.message);
        }

        throw error;
    }
};