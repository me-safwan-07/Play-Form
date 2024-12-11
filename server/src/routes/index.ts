import express, { Express, Request, Response } from "express";
import personRoutes from './personRoutes';
import displayRoutes from './displayRoutes';
import userRoutes from './userRoutes';

const app: Express = express();

app.use("/person", personRoutes);
app.use("/display", displayRoutes);
app.use("/form", personRoutes);
app.use("/user", userRoutes);

export default app;