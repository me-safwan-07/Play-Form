import express, { Express, Request, Response } from "express";
import personRoutes from './personRoutes';
import displayRoutes from './displayRoutes';
import userRoutes from './userRoutes';
import formRoutes from './formRoutes';
import responseRoutes from './responseRoutes';
import { userRegister } from "../controllers/authController";
import authRoutes from "./authRoutes"
const app: Express = express();

app.use("/person", personRoutes);
// app.use("/display", displayRoutes);
app.use("/forms", formRoutes);
app.use("/user", userRoutes);
app.use("/response", responseRoutes);
app.use("/auth", authRoutes);
export default app;