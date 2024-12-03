import express, { Express, Request, Response } from "express";
import { createPerson, deletePerson, getPerson } from "../../controllers/personController";

const app: Express = express();

app.get('/:id', getPerson);
app.post('/', createPerson);
app.delete('/:id', deletePerson);

export default app;