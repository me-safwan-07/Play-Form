import express, { Express, Request, Response } from "express";
import { verifyToken } from '../middleware/verifyToken';
import * as authController from '../controllers/authController';
import * as formController from '../controllers/formController';
import * as productController from '../controllers/productController';
import { environmentController } from "../controllers/environmentController";

const app: Express = express();

// app.use("/display", displayRoutes);
// app.use("/forms", formRoutes);
// app.use("/user", userRoutes);
// app.use("/response", responseRoutes);
// app.use("/auth", authRoutes);

const router = express.Router();

// Auth routes
router.post('/auth/signup', authController.createUser);
// router.get('/auth/user/', verifyToken authController.getUser);
router.post('/auth/login', authController.login);
router.get('/auth/google', authController.googleAuth);

// Form routes
router.get('/forms/count', verifyToken, formController.getFormCount);
router.get('/forms', verifyToken, formController.getForms);
router.get('/form/:formId', verifyToken, formController.getForm);
router.post('/forms', verifyToken, formController.createForm);
router.put('/forms/:formId', verifyToken, formController.updateForm);
router.delete('/forms/:formId', verifyToken, formController.deleteForm);

// Response routes
// router.get('/forms/:formId/responses', verification, responseController.getResponses);
// router.post('/forms/:formId/responses', responseController.createResponse);
// router.put('/responses/:responseId', verification, responseController.updateResponse);

// Product routes
router.get('/forms/:formId/products', verifyToken, productController.getProducts);
router.post('/forms/:formId/products', verifyToken, productController.createProduct);
router.put('/products/:productId', verifyToken, productController.updateProduct);
router.delete('/products/:productId', verifyToken, productController.deleteProduct);

// Environment routes
router.get('/environment', verifyToken, environmentController);

export default router;


