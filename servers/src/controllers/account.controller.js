import { validationResult } from 'express-validator';
import { createAccount } from '../services/account.services.js';

export const createAccountController = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;

    try {
        const account = await createAccount(data);

        res.status(201).json({ 
            success: true, 
            message: 'Account created successfully',
            data: account 
        });
    } catch (error) {
        next(error);
    }
};