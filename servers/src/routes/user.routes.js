import express from 'express';
import { createUserController, deleteUserByIdController, getUserByEmailController, getUserController, updateUserController } from '../controllers/user.controller.js';

const router = express.Router();

// Create a new User
router.get('/users/:id', getUserController);
router.get('/users/email/:email', getUserByEmailController);
router.put('/users/:personId', updateUserController);
router.post('/users', createUserController);
router.delete('/users/:id', deleteUserByIdController);

export default router;