import express, { Router, Request, Response } from "express";
import { createUser, getUser, } from "../../controllers/authController";

const router: Router = express.Router();

// router.get('/getuser/:id', getUser);
router.post('/create-user', createUser);
// router.put('/update-user/:id', updateUser);
// router.delete('/delete-user/:id', deleteUserById);

export default router;