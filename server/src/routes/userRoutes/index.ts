import express, { Router, Request, Response, NextFunction } from "express";
import { 
    createUserController, 
    deleteUser, 
    getUserById, 
    updateUserById 
} from "../../controllers/userController";

const router: Router = express.Router();

router.post('/create', createUserController);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await getUserById(req, res, next);
});

router.put('/:id', updateUserById);

router.delete('/:id', deleteUser);

export default router;