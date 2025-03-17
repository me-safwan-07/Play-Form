"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const envrironment_controller_1 = require("../controllers/envrironment.controller");
const router = (0, express_1.Router)();
// Get single Environment
router.get('/:environmentId', verifyToken_1.verifyToken, envrironment_controller_1.getEnvironmentController);
// Get all environments by product
router.get('/:productId', verifyToken_1.verifyToken, envrironment_controller_1.getEnvironmentController);
// create new environement
router.post('/:environmentId');
// update environment
router.put('/:environmentId', verifyToken_1.verifyToken, envrironment_controller_1.updateEnvironmentController);
exports.default = router;
