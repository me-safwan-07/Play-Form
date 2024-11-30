import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getPerson } from "./controllers/personController";

dotenv.config();

const app: Express = express();

app.get('/:id', getPerson);

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export { app };
