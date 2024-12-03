import express, { Express, Request, Response } from "express";
import { createDisplay, getDisplayByPersonId } from "../../controllers/displayController";

const app: Express = express();

app.get('/:displayId', getDisplayByPersonId);
app.post('/', createDisplay);
// app.delete('/:id', deletePerson);

export default app;