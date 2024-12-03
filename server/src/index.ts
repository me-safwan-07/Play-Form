import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from './routes';

dotenv.config();

const app: Express = express();
app.use(express.json()); // Alternatively, bodyParser.json() works too

const BASE_URL: string = process.env.BASE_URL || ""; // Default to "/api" if BASE_URL is not set

// Ensure BASE_URL starts with a "/"
const routePrefix = BASE_URL.startsWith("/") ? BASE_URL : `/${BASE_URL}`;

app.use(routePrefix, routes);

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export { app };
