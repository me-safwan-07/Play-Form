import express, { Router } from "express";
import { 
    createUserController, 
    deleteUser, 
    getUserById, 
    updateUserById 
} from "../../controllers/userController";

const router: Router = express.Router();

router.post('/create', createUserController);

router.get('/:id', getUserById);

router.put('/:id', updateUserById);

router.delete('/:id', deleteUser);

export default router;