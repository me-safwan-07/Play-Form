import express, { Express, Request, Response } from "express";
import displayRoutes from './displayRoutes';
import userRoutes from './userRoutes';
import formRoutes from './formRoutes';
import responseRoutes from './responseRoutes';
import authRoutes from "./authRoutes"
import { verification } from '../middleware/verifyToken';
import * as authController from '../controllers/authController';
import * as formController from '../controllers/formController';
import * as productController from '../controllers/productController';

const app: Express = express();

// app.use("/display", displayRoutes);
// app.use("/forms", formRoutes);
// app.use("/user", userRoutes);
// app.use("/response", responseRoutes);
// app.use("/auth", authRoutes);

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.createUser);
router.get('/auth/user/', verification, authController.getUser);

// Form routes
router.get('/forms', verification, formController.getForms);
router.get('/forms/:formId', verification, formController.getForm);
router.post('/forms', verification, formController.createForm);
router.put('/forms/:formId', verification, formController.updateForm);
router.delete('/forms/:formId', verification, formController.deleteForm);

// Response routes
// router.get('/forms/:formId/responses', verification, responseController.getResponses);
// router.post('/forms/:formId/responses', responseController.createResponse);
// router.put('/responses/:responseId', verification, responseController.updateResponse);

// Product routes
router.get('/forms/:formId/products', verification, productController.getProducts);
router.post('/forms/:formId/products', verification, productController.createProduct);
router.put('/products/:productId', verification, productController.updateProduct);
router.delete('/products/:productId', verification, productController.deleteProduct);

export default router;


