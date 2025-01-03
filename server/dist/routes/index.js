"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personRoutes_1 = __importDefault(require("./personRoutes"));
const displayRoutes_1 = __importDefault(require("./displayRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const formRoutes_1 = __importDefault(require("./formRoutes"));
const responseRoutes_1 = __importDefault(require("./responseRoutes"));
const app = (0, express_1.default)();
app.use("/person", personRoutes_1.default);
app.use("/display", displayRoutes_1.default);
app.use("/forms", formRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/response", responseRoutes_1.default);
exports.default = app;
