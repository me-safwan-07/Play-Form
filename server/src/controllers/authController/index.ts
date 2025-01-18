import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register
export const userRegister = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // check if the user is already registered
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                accounts: true,
            }
        });

        if (existingUser) {
            res.status(400).json({
                error: 'Email already registered'
            });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                identityProvider: 'email'
            },
            include: {
                accounts: true,
            }
        });

        // Generate token
        if (!process.env.JWTAUTH_SECRET) {
            throw new Error('JWTAUTH_SECRET is not defined');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWTAUTH_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                identityProvider: user.identityProvider,
                accounts: user.accounts
            },
            token
        });

        next();
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        res.status(500).json({ error: 'Failed to register user' });
        next(error);
    }
};

// login

export const userLogin = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                accounts: true,
            }
        });

        if (!user) {
            res.status(401).json({ error: 'Invalid credientials' });
            return;
        }

        // check password
        if (!user.password) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate token
        if (!process.env.JWTAUTH_SECRET) {
            throw new Error('JWTAUTH_SECRET is not defined');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWTAUTH_SECRET, { expiresIn: '1d' });

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                accounts: user.accounts
            },
            token
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(401).json({ error: err.message });
        } else {
            res.status(401).json({ error: 'Unknown error' });
        }
        return;
    }
}

// get curent user
export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header("Authorization")?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        if (!process.env.JWTAUTH_SECRET) {
            throw new Error('JWTAUTH_SECRET is not defined');
        }

        const decoded = jwt.verify(token, process.env.JWTAUTH_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: (decoded as jwt.JwtPayload).userId
            },
            include: {
                accounts: true,
            }
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                accounts: user.accounts
            }
        });

        next(); 
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: "Invalid token" });
            return;
        } else {
            res.status(500).json({ error: "Failed to authenticate user" });
            return;
        }
        next(error);
    }
};