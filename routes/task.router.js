// create a new router for Task management
const express = require("express");
const router = express.Router();

// Import the controller
const taskController = require("../controller/Task.controller");

// Create a new task
router.post("/create", taskController.createTask);

// Get all tasks
router.get("/list", taskController.getTaskList);

// Get task by ID
router.get("/:taskId", taskController.getTaskById);

// Update task
router.put("/:taskId", taskController.updateTask);

// Delete task
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
