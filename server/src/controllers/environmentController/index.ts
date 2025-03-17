import e, { NextFunction, Request, Response } from "express";
import { prisma } from "../../database";

export const environmentController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.userId;

    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!checkUser) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        res.status(200).json(checkUser.id);
        next();
    } catch (error) {
        console.error(`Error fetching user: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }
}