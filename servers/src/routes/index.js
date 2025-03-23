import express from 'express';
import userRouter from './user.routes.js';
import accountRouter from './account.routes.js';
import authRouter from './auth.routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/accounts', accountRouter);

export default router;