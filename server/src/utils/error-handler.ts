import { Response } from "express";
import { AuthorizationError, NotFoundError, ValidationError } from "./errors";

export const handleError = (error: unknown, res: Response): void => {
    console.error('Error:', error);

    if (error instanceof NotFoundError) {
        res.status(404).json({ error: error.message });
    } else if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
    } else if (error instanceof AuthorizationError) {
        res.status(403).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Internal server error' });
    }
};