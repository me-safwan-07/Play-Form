import { Prisma } from "@prisma/client";
import { prisma } from "../database";
import { TUser, TUserCreateInput, TUserUpdateInput } from "../types/user";
import { validateInputs } from "../utils/validate";
import { DatabaseError, ResourceNotFoundError, ValidationError } from "../types/errors";
import z from 'zod'
const responseSelection = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
  // twoFactorEnabled: true,
  identityProvider: true,
};

export const CreateUser = async (data: TUserCreateInput): Promise<TUser> => {
  try {
    // Validate inputs if needed (uncomment when `validateInputs` is defined)
    // validateInputs([data, ZUser]);

    const user = await prisma.user.create({
      data: data,
      select: responseSelection,
    });

    return user;
  } catch (error) {
    // Unique constraint violation (e.g., duplicate email)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new DatabaseError("User with this email already exists");
    }

    // Other known Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(error.message);
    }

    // Unknown errors
    throw error;
  }
};


export const getUserByEmail  = async (email: string): Promise<TUser | null> => {
  validateInputs([email, z.string().email()]);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: responseSelection,
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(error.message);
    }

    throw error;
  }
};

export const updateUser = async (personId: string, data: TUserUpdateInput): Promise<TUser> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: personId,
      },
      data: data,
      select: responseSelection,
    });

    return updatedUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2016") {
      throw new ResourceNotFoundError("User", personId);
    }
    throw error;
  }
}