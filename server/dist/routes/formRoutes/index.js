"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formController_1 = require("../../controllers/formController");
// import { createPerson, deletePerson, getPerson } from "../../controllers/personController";
const app = (0, express_1.default)();
app.get('/:surveyId', formController_1.fetchSurvey);
exports.default = app;
