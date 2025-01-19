import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TUser, TUserCreateInput } from "../../types/user";

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

export const getUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id:string = req.params.id;

        // check if the user is already registered
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: responseSelection
        });

        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user });

        next();
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        res.status(500).json({ error: 'Failed to register user' });
        next(error);
    }
};

export const createUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: TUserCreateInput = req.body;

        const user = await prisma.user.create({
            data: data,
            select: responseSelection
        });

        res.status(200).json({ user });
        next(user);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002" ) {
            res.status(409).json({ message: 'Email already exists' });
            console.log(err.message)
            return;
        }

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(403).json({ message: err.message });
            console.log(err.message);
            return;
        }
        res.status(500).json({ message: 'Failed to create user' });
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: string = req.params.id;
        const data: TUserCreateInput = req.body;

        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: data,
            select: responseSelection
        });

        res.status(200).json({ user: updateUser });
        return
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2016') {
            res.status(404).json({ error: error.message });
        }
        res.status(404).json({ message: 'user not updated' });
        next(error);
    }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: string = req.params.id;
        const user = await prisma.user.delete({
            where: {
                id
            },
            select: responseSelection
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'User deleted' });
        next(user);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(403).json({ message: error.message });
            console.log(error.message);
            return;
        }

        res.status(500).json({ message: 'Failed to delete user' });
        next(error);
    }
};