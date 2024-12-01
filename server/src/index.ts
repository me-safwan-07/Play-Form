import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createPerson, getPerson } from "./controllers/personController";

const app: Express = express();
dotenv.config();
app.use(express.json()); // Alternatively, bodyParser.json() works too

app.get('/:id', getPerson);
app.post('/user', createPerson);

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export { app };
