import { Router } from "express";
import { FormController } from "../../controllers/formController";

const router = Router();

router.post('/', (req, res) => {
    FormController.createForm(req, res)
});
// router.get('/', FormController.getAllForms());
router.get('/', (req, res) => {
    FormController.getAllForms(req, res)
});
router.get('/:id', (req, res) => {
    FormController.getFormById(req, res)
});
router.put('/:id', (req, res) => {
    FormController.updateForm(req, res)
});
router.delete('/:id', (req, res) => {
    FormController.deleteForm(req, res)
});
// router.get('/', (req, res) => {
//     FormController.getUserForm(req, res)
// });


export default router;
