"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = require("../../controllers/formController");
const verifyToken_1 = require("../../middleware/verifyToken");
const router = (0, express_1.Router)();
// router.post('/count/:environmentId', getFormCount);
router.post('/', verifyToken_1.verification, formController_1.createForm);
exports.default = router;
