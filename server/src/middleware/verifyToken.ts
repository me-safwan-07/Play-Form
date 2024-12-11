import { NextFunction, Request, Response } from "express";
import admin from "../lib/firebase";

export const verification = async(req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization;

    if (!idToken) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).send("unauthorized");
    }
}