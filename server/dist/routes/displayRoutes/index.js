"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { getDisplayByPersonId } from "../../controllers/displayController";
const app = (0, express_1.default)();
// app.get('/:displayId', getDisplayByPersonId);
// app.post('/', createDisplay);
// app.delete('/:id', deletePerson);
exports.default = app;
