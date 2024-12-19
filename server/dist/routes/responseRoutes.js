"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const responseController_1 = require("../controllers/responseController");
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    responseController_1.ResponseController.createForm(req, res);
});
// router.get('/', FormController.getAllForms());
router.get('/', (req, res) => {
    responseController_1.ResponseController.getAllResponses(req, res);
});
router.get('/:id', (req, res) => {
    responseController_1.ResponseController.getFormById(req, res);
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
exports.default = router;
