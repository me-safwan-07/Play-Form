import express, { Router, Request, Response } from "express";
import { me, userLogin, userRegister } from "../../controllers/authController";

const router: Router = express.Router();

router.get('/register', userRegister);
router.post('/login', userLogin);
router.get('/me', me);

export default router;