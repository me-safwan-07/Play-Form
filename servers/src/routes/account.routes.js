import express from 'express';
import { createAccountController } from '../controllers/account.controller.js';
import { body, param } from 'express-validator';

const router = express.Router();

router.post('/:userId', 
    [
        param('userId').isString().withMessage('User ID must be a string'),
        body('type').isString().withMessage('Type must be a string'),
        body('provider').isString().withMessage('Provider must be a string'),
        body('providerAccountId').isString().withMessage('Provider account ID must be a string'),
        body('access_token').optional().isString().withMessage('Access token must be a string'),
        body('refresh_token').optional().isString().withMessage('Refresh token must be a string'),
        body('expires_at').optional().isNumeric().withMessage('Expires at must be a number'),
        body('scope').optional().isString().withMessage('Scope must be a string'),
        body('token_type').optional().isString().withMessage('Token type must be a string'),
        body('id_token').optional().isString().withMessage('ID token must be a string'),
    ], 
    createAccountController
);

export default router;