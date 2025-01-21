"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formRoutes_1 = __importDefault(require("./formRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const app = (0, express_1.default)();
// app.use("/display", displayRoutes);
app.use("/forms", formRoutes_1.default);
// app.use("/user", userRoutes);
// app.use("/response", responseRoutes);
app.use("/auth", authRoutes_1.default);
exports.default = app;
