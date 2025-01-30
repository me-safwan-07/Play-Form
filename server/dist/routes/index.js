"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middleware/verifyToken");
const authController = __importStar(require("../controllers/authController"));
const formController = __importStar(require("../controllers/formController"));
const productController = __importStar(require("../controllers/productController"));
const environmentController_1 = require("../controllers/environmentController");
const app = (0, express_1.default)();
// app.use("/display", displayRoutes);
// app.use("/forms", formRoutes);
// app.use("/user", userRoutes);
// app.use("/response", responseRoutes);
// app.use("/auth", authRoutes);
const router = express_1.default.Router();
// Auth routes
router.post('/auth/signup', authController.createUser);
router.get('/auth/user/', verifyToken_1.verification, authController.getUser);
router.post('/auth/login', authController.login);
router.get('/auth/google', authController.googleAuth);
// Form routes
router.get('/forms/count', verifyToken_1.verification, formController.getFormCount);
router.get('/forms', verifyToken_1.verification, formController.getForms);
router.get('/form/:formId', verifyToken_1.verification, formController.getForm);
router.post('/forms', verifyToken_1.verification, formController.createForm);
router.put('/forms/:formId', verifyToken_1.verification, formController.updateForm);
router.delete('/forms/:formId', verifyToken_1.verification, formController.deleteForm);
// Response routes
// router.get('/forms/:formId/responses', verification, responseController.getResponses);
// router.post('/forms/:formId/responses', responseController.createResponse);
// router.put('/responses/:responseId', verification, responseController.updateResponse);
// Product routes
router.get('/forms/:formId/products', verifyToken_1.verification, productController.getProducts);
router.post('/forms/:formId/products', verifyToken_1.verification, productController.createProduct);
router.put('/products/:productId', verifyToken_1.verification, productController.updateProduct);
router.delete('/products/:productId', verifyToken_1.verification, productController.deleteProduct);
// Environment routes
router.get('/environment', verifyToken_1.verification, environmentController_1.environmentController);
exports.default = router;
