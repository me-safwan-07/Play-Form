import express, { Express, Request, Response } from "express";
import { fetchSurvey } from "../../controllers/formController";
// import { createPerson, deletePerson, getPerson } from "../../controllers/personController";

const app: Express = express();

app.get('/:surveyId', fetchSurvey);


export default app;