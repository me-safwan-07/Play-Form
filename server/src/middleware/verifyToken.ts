import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).send("Unauthorized");
        return;
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).send("JWT_SECRET not defined");
        return;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
        req.params = { userId: decodedToken.userId }; // Assign an object with userId to req.user
        next();
    } catch (error) {
        res.status(403).send("Unauthorized");
        return;
    }
};
