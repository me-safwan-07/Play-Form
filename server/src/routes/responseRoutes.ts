import { Router } from "express";
import { ResponseController } from "../controllers/responseController";

const router = Router();

router.post('/', (req, res) => {
    ResponseController.createResponse(req, res)
});
// router.get('/', FormController.getAllForms());
router.get('/', (req, res) => {
    ResponseController.getAllResponses(req, res)
});
router.get('/:id', (req, res) => {
    ResponseController.getFormById(req, res)
});
// router.put('/:id', (req, res) => {
//     ResponseController.updateForm(req, res)
// });
// router.delete('/:id', (req, res) => {
//     ResponseController.deleteForm(req, res)
// });
// router.get('/', (req, res) => {
//     ResponseController.getUserForm(req, res)
// });


export default router;
