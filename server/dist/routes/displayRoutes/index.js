"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const displayController_1 = require("../../controllers/displayController");
const app = (0, express_1.default)();
app.get('/:displayId', displayController_1.getDisplayByPersonId);
app.post('/', displayController_1.createDisplay);
// app.delete('/:id', deletePerson);
exports.default = app;
