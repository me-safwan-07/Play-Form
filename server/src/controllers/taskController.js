import { prisma } from "../libs/prismadb.js";

// create task
export const createTaskCtrl = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(404).json({
                success: false,
                message: "Title and description are required",
            });
        }
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
            },
        });
        res.json({
            success: true,
            message: "Task created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in create task ctrl",
            error: error.message || "Internal Server Error",
        });
    }
};

// get all task
export const myTasksCtrl = async (req, res) => {
    try {
        const myTasks = await prisma.task.findMany({});
        res.status(200).json({
            success: true,
            message: "All tasks fetched",
            myTasks,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching my all tasks",
            error: error.message || "Internal Server Error",
        });
    }
};

// update task
export const updateTaskCtrl = async (req, res) => {
    try {
        const tid = req.params.tid;
        const existingTask = await prisma.task.findUnique({
            where: {
                id: tid,
                // we don't have to wirte _id as it automatically maps with _id
            },
        });

        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: tid,
            },
            data: {
                isCompleted: !existingTask.isCompleted, // Toggle the isCompleted value
            },
        });

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in update task ctrl",
            error: error.message || "Internal Server Error",
        });
    }
};

// delete task
export const deleteTaskCtrl = async (req, res) => {
    try {
        const { tid } = req.params;
        const existingTask = await prisma.task.findUnique({
            where: {
                id: tid,
            },
        });
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        const deletedTask = await prisma.task.delete({
            where: {
                id: tid,
            },
        });
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in delete ctrl",
            error: error.message || "Internal Server Error",
        });
    }
};
