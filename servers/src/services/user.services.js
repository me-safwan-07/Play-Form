import prisma from '../../prisma/index.js';
import { cache } from '../utils/cacheWrapper.js';
import { userCache } from '../caches/user.cache.js';
import { Prisma } from '@prisma/client';
import { validateInputs } from '../utils/validate.js';
import { DatabaseError, ResourceNotFoundError } from '../validations/error.validations.js';
import Joi from 'joi';
import { JId } from '../validations/environment.validations.js';
import { JUserCreateInput, JUserUpdateInput } from '../validations/user.validation.js';

const responseSelection = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
  identityProvider: true,
  notificationSettings: true,
};


export const getUser = async (id) => {
  const cacheKey = userCache.tag.byId(id);

  return cache(cacheKey, async () => {
    validateInputs([id, JId]);
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: responseSelection,
      });

      return user || null;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError(error.message);
      }

      throw error;
    }
  });
};

export const getUserByEmail = async (email) => {
  const cacheKey = userCache.tag.byEmail(email);

  return cache(cacheKey, async () => {
    validateInputs([email, Joi.string().email().required()]);

    try {
      const users = await prisma.user.findFirst({
        where: { 
          email 
        },
        select: responseSelection,
      });
      return users;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError(error.message);
      }

      throw error;
    }
  });
};

export const updateUser = async (personId, data) => {
  validateInputs([personId, JId], [data, JUserCreateInput]);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: personId,
      },
      data: data,
      select: responseSelection
    });

    userCache.revalidate(
      updatedUser.id, 
      updatedUser.email
    );

    return updatedUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2016") {
      throw new ResourceNotFoundError("User", personId);
    }

    throw error
  }
}

export const deleteUserById = async (id) => {
  validateInputs([id, JId]);

  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
      select: responseSelection
    });

    userCache.revalidate(
      id,
      user.email,
      true
    )

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Database Error: ${error.message}`)
    }

    throw error;
  }
};

export const createUser = async (data) => {
  validateInputs([data, JUserCreateInput]);

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      }
    });

    if (existingUser) {
      throw new Error("User already Exists")
    };
    
    const user = await prisma.user.create({
      data,
      select: responseSelection,
    });

    userCache.revalidate(
      user.email,
      user.id,
      true,
    );

    // TODO: Send welcome email

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new DatabaseError("User with this email already exists");
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(error.message);
    }

    throw error;
  }
};