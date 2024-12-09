import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import cors from "cors";

dotenv.config();

const app: Express = express();

// Enable CORS with default settings or custom configuration
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*", // Replace "*" with your client URL in production
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
  })
);

// Enable JSON body parsing
app.use(express.json());

// Base URL configuration
const BASE_URL: string = process.env.BASE_URL || ""; // Default to empty if not set
const routePrefix = BASE_URL.startsWith("/") ? BASE_URL : `/${BASE_URL}`;
app.use(routePrefix, routes);

// Server listening on a specified port
const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export { app };
