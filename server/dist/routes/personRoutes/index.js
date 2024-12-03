"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personController_1 = require("../../controllers/personController");
const app = (0, express_1.default)();
app.get('/:id', personController_1.getPerson);
app.post('/', personController_1.createPerson);
app.delete('/:id', personController_1.deletePerson);
exports.default = app;
