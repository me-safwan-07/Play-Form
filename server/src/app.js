import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import taskRoutes from "./routes/taskRoute.js";
export const app = express();

// middlewares
app.use(express.json());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
// routes
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "This is Home Route",
    });
});
