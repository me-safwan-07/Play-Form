import { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TUser, TUserCreateInput } from "../../types/user";
import { validationResult } from "express-validator";
import axios from 'axios';
import { oauth2Client } from "../../utils/oauth2client";
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
  forms: true,
};

// login
export const getUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id:string = req.params.userId;

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
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(error.message);
        } else {
            console.error('Unknown error', error);
        }
        res.status(500).json({ error: 'Failed to register user' });
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const isUserAlready = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (isUserAlready) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                // You can omit `forms` here if you don't need to create forms immediately
            },
            select: responseSelection,
        });

        // Retrieve the forms created by this user
        const forms = await prisma.form.findMany({
            where: {
                createdBy: user.id
            }
        });
        user.forms = forms;

        // JWT Creation
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        let token: string;
        try {
            // Generate JWT token
            token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        } catch (error) {
            console.error('Error generating JWT token', error);
            res.status(500).json({ error: 'Error generating JWT token' });
            return;
        }

        // Respond with the user data and token
        res.status(201).json({ user, token });
        next();

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(400).json({ message: 'User with this email already exists' });
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(error.message);
            res.status(400).json({ message: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(500).json({ error: 'Failed to register user' });
        }
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { email } });

    if (!user || !user.password) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
        next();
    } catch (error) {
        console.error('Error generating JWT token', error);
        res.status(500).json({ error: 'Error generating JWT token' });
        next(error);
    }
}

const signToken = (id: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

const createSendToken = (user: TUser, statusCode: number, res: Response) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'none'
    }

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
        cookieOptions.sameSite = 'none';
    };


    res.cookie('jwt', token, {
        ...cookieOptions,
        sameSite: 'none' as const
    });

    console.log(user);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};


export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code;

    const googleRes = await oauth2Client.getToken(code as string);

    if (!googleRes) {
        res.status(400).json({ message: 'Failed to get Google tokens' });
        return;
    }
    
    oauth2Client.setCredentials((await googleRes).tokens);

    const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${(await googleRes).tokens.access_token}`
    );

    if (!userRes) {
        res.status(400).json({ message: 'Failed to get Google user info' });
        return;
    }
	
    let user = await prisma.user.findFirst({ where: { email: userRes.data.email } });
   
    if (!user) {
        user = await prisma.user.create({
            data: {
                name: userRes.data.name,
                email: userRes.data.email,
                imageUrl: userRes.data.picture,
            }
        });
    }

    createSendToken(user, 201, res);
}
