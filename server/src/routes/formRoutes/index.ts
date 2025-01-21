import { Router } from "express";
import { getFormCount } from "../../controllers/formController";

const router = Router();

router.post('/count/:environmentId', getFormCount);
export default router;
