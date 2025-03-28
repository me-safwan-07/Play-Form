import { Request, Response, NextFunction } from "express";
// import { CreateUser } from "../../services/userService";
import { TUserCreateInput } from "../../types/user";
import { prisma } from "../../database";
import { cache } from "../../config/cache";
import { Prisma } from "@prisma/client";
import { userCache } from "./cache";

const responseSelection = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
  identityProvider: true,
};

// function to retrive basic information about a user's user
export const getUserById = async(req: Request, res: Response, next: NextFunction) => 
  cache(
    async () => {
      const id: string = req.body.id;
      try {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
          select: responseSelection
        });

        if (!user) {
          return null;
        }

        res.status(200).json(user);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          res.status(400).json({ error: `Database Error: ${error.message}` });
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
        next(error);
      }
    },
    `getUser-${req.body.id}`,
    {
      tag: [userCache.tag.byId(req.body.id)],
    }
  )();

export const createUserController = async (
  req: Request<{}, {}, TUserCreateInput>, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userData: TUserCreateInput = req.body;
    
    // const user = await CreateUser(userData);
    
    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const user = await prisma.user.findUnique({
//       where: { id },
//       select: responseSelection
//     });

//     if (!user) {
//       res.status(404).json({ success: false, message: 'User not found' });
//       return 
//     };

//     res.json(user);
//     next();
//   } catch (error) {
//     res.status(404).json({ error: 'Failed to get user' });
//     next(error);
//   }
// };

export const updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: req.body,
      select: responseSelection
    });

    if (!updatedUser) {
      res.status(404).json({ success: false, message: 'User not found' });
      return 
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id }
    });
    res.status(204).send('User deleted successfully');
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
    next(error);
  }
};


