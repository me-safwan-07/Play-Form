import express from 'express';
import { createUserController, deleteUserByIdController, getUserByEmailController, getUserController, updateUserController } from '../controllers/user.controller.js';
import { body, param } from 'express-validator';

const router = express.Router();

// Create a new User
router.get(
    '/users/:id', 
    [
        param('id').isString().withMessage('ID must be a string'),
    ],
    getUserController
);

router.get(
    '/users/email/:email',
    [
        param('email').isEmail().withMessage('Email must be a valid email address'),
    ],
    getUserByEmailController
);

router.put(
    '/users/:personId', 
    [
        param('personId').isString().withMessage('Person ID must be a string'),
        body('name').optional().isString().withMessage('Name must be a string'),
        body('email').optional().isEmail().withMessage('Must be a valid email'),
        body('emailVerified').optional().isISO8601().toDate().withMessage('Must be a valid date'),
        body('imageUrl').optional().isURL().withMessage('Must be a valid URL'),
        body('notificationSettings').optional().isObject().withMessage('Notification settings must be an object')
    ],
    updateUserController
);

router.post(
    '/users', 
    [
        body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Must be a valid email'),
        body('emailVerified').optional().isISO8601().toDate().withMessage('Must be a valid date'),
        body('identityProvider').isIn(['email', 'google']).withMessage('Invalid identity provider'),
        body('identityProviderAccountId').optional().isString().withMessage('Identity provider account ID must be a string')
    ],
    createUserController);
router.delete(
    '/users/:id', 
    [
        param('id').isString().withMessage('ID must be a string'),
    ], 
    deleteUserByIdController
);

export default router;