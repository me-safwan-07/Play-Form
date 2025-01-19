"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/authController");
const router = express_1.default.Router();
router.get('/getuser/:id', authController_1.getUser);
router.post('/create-user', authController_1.createUser);
router.put('/update-user/:id', authController_1.updateUser);
router.delete('/delete-user/:id', authController_1.deleteUserById);
exports.default = router;
