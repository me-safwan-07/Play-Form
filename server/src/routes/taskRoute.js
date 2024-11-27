import express from "express";
import {
    createTaskCtrl,
    deleteTaskCtrl,
    myTasksCtrl,
    updateTaskCtrl,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create-task", createTaskCtrl);
router.get("/my-tasks", myTasksCtrl);
router.put("/update-task/:tid", updateTaskCtrl);
router.delete("/delete-task/:tid", deleteTaskCtrl);

export default router;
