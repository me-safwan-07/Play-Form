"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personRoutes_1 = __importDefault(require("./personRoutes"));
const displayRoutes_1 = __importDefault(require("./displayRoutes"));
const app = (0, express_1.default)();
app.use("/person", personRoutes_1.default);
app.use("/display", displayRoutes_1.default);
exports.default = app;
