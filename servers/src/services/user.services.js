import prisma from '../../prisma/index.js';
import { cache, revalidateCache } from '../utils/cacheWrapper.js';
import { userCache } from '../caches/user.cache.js';
import redisClient from '../utils/redisClient.js';
import { Prisma } from '@prisma/client';

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

/**
 * Fetch user by ID with caching.
 * @param {string} id - User ID.
 * @returns {Promise} - Resolves with the user data.
 */
export const getUser = async (id) => {
  const cacheKey = userCache.tag.byId(id);

  return cache(cacheKey, async () => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: responseSelection,
      });
      return user || null;
    } catch (error) {
      console.error('Database Error in getUser:', error);
      throw error;
    }
  });
};

/**
 * Fetch user by email with caching.
 * @param {string} email - User email.
 * @returns {Promise} - Resolves with the user data.
 */
export const getUserByEmail = async (email) => {
  const cacheKey = userCache.tag.byEmail(email);
  return cache(cacheKey, async () => {
    try {
      const users = await prisma.user.findMany({
        where: { email },
        select: responseSelection,
      });
      return users[0] || null; // Return the first user or null
    } catch (error) {
      console.error('Database Error in getUserByEmail:', error);
      throw error;
    }
  });
};

export const updateUser = async (personId, data) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: personId,
      },
      data: data,
      select: responseSelection
    });

    userCache.revalidate(updatedUser.id, updatedUser.email);

    return updatedUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2016") {
      throw new Error("Resource Not Found")
    }

    throw error
  }
}

export const deleteUserById = async (id) => {

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
}

/**
 * Create a new user and revalidate relevant cache keys.
 * @param {object} data - User data.
 * @returns {Promise} - Resolves with the created user.
 */
export const createUser = async (data) => {
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

    // // Revalidate cache for the new user
    // await revalidateCache(userCache.tag.byId(user.id));
    // await revalidateCache(userCache.tag.byEmail(user.email));

    userCache.revalidate(
      user.email,
      user.id,
      true,
    )
    return user;
  } catch (error) {
    console.error('Database Error in createUser:', error);
    throw error;
  }
};