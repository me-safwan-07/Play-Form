import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { getEnvironmentController, updateEnvironmentController } from "../controllers/envrironment.controller";
import { authenticate } from "passport";

const router = Router();

// Get single Environment
router.get('/:environmentId', verifyToken, getEnvironmentController);

// Get all environments by product
router.get('/:productId', verifyToken, getEnvironmentController);

// create new environement
router.post('/:environmentId');

// update environment
router.put('/:environmentId', verifyToken, updateEnvironmentController);

export default router;