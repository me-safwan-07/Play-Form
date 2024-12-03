import express, { Express, Request, Response } from "express";
import personRoutes from './personRoutes';
import displayRoutes from './displayRoutes';

const app: Express = express();

app.use("/person", personRoutes);
app.use("/display", displayRoutes);

export default app;