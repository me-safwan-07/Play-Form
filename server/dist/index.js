"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const verifyToken_1 = require("./middleware/verifyToken");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
// Enable CORS with default settings or custom configuration
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN || "*", // Replace "*" with your client URL in production
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
}));
// Enable JSON body parsing
app.use(express_1.default.json());
// Base URL configuration
const BASE_URL = process.env.BASE_URL || ""; // Default to empty if not set
const routePrefix = BASE_URL.startsWith("/") ? BASE_URL : `/${BASE_URL}`;
app.use(routePrefix, routes_1.default);
// Add this before your protected routes
app.use('/api/forms', verifyToken_1.verifyToken);
app.use('/api/responses', verifyToken_1.verifyToken);
// Server listening on a specified port
const port = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
