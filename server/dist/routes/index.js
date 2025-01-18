"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personRoutes_1 = __importDefault(require("./personRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const formRoutes_1 = __importDefault(require("./formRoutes"));
const responseRoutes_1 = __importDefault(require("./responseRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const app = (0, express_1.default)();
app.use("/person", personRoutes_1.default);
// app.use("/display", displayRoutes);
app.use("/forms", formRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/response", responseRoutes_1.default);
app.use("/auth", authRoutes_1.default);
exports.default = app;
