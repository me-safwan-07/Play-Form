"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json()); // Alternatively, bodyParser.json() works too
const BASE_URL = process.env.BASE_URL || ""; // Default to "/api" if BASE_URL is not set
// Ensure BASE_URL starts with a "/"
const routePrefix = BASE_URL.startsWith("/") ? BASE_URL : `/${BASE_URL}`;
app.use(routePrefix, routes_1.default);
const port = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
