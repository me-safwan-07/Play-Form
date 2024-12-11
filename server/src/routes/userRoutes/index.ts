import express, { Express, Request, Response, Router } from "express";
import { createUserController } from "../../controllers/userController";

const router: Router = express.Router();

router.post('/create', createUserController);


export default router;