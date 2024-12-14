"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = require("../../controllers/formController");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    formController_1.FormController.createForm(req, res);
});
// router.get('/', FormController.getAllForms());
router.get('/', (req, res) => {
    formController_1.FormController.getAllForms(req, res);
});
router.get('/:id', (req, res) => {
    formController_1.FormController.getFormById(req, res);
});
router.put('/:id', (req, res) => {
    formController_1.FormController.updateForm(req, res);
});
router.delete('/:id', (req, res) => {
    formController_1.FormController.deleteForm(req, res);
});
// router.get('/', (req, res) => {
//     FormController.getUserForm(req, res)
// });
exports.default = router;
