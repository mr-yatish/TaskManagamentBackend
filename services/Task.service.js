const mongoose = require("mongoose");
const Task = require("../models/Task.model"); // Assuming task model is stored in models/task.js

// 1. **Create Task**
const createTask = async (taskData) => {
  try {
    const task = new Task(taskData);
    await task.save();
    return { status: true, message: "Task created successfully", data: task };
  } catch (error) {
    return { status: false, message: error.message, data: false };
  }
};

// 2. **Get Task by ID**
const getTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return { status: false, message: "Task not found", data: false };
    }
    return { status: true, message: "Task found", data: task };
  } catch (error) {
    return { status: false, message: error.message, data: false };
  }
};

// 3. **Get All Tasks**
const getAllTasks = async () => {
  try {
    const tasks = await Task.find();
    return { status: true, message: "Tasks retrieved", data: tasks };
  } catch (error) {
    return { status: false, message: error.message, data: false };
  }
};

// 4. **Update Task**
const updateTask = async (taskId, updateData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures validators run for updated fields
    });

    if (!updatedTask) {
      return { status: false, message: "Task not found", data: false };
    }

    return {
      status: true,
      message: "Task updated successfully",
      data: updatedTask,
    };
  } catch (error) {
    return { status: false, message: error.message, data: false };
  }
};

// 5. **Delete Task**
const deleteTask = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndUpdate(taskId, {
      deleteFlag: true, // Soft delete
    });

    if (!deletedTask) {
      return { status: false, message: "Task not found", data: false };
    }

    return {
      status: true,
      message: "Task marked as deleted",
      data: deletedTask,
    };
  } catch (error) {
    return { status: false, message: error.message, data: false };
  }
};

// 6. **Hard Delete Task (Permanent Delete)**
// const hardDeleteTask = async (taskId) => {
//   try {
//     const deletedTask = await Task.findByIdAndDelete(taskId);
//     if (!deletedTask) {
//       return { status: false, message: "Task not found", data: false };
//     }

//     return {
//       status: true,
//       message: "Task permanently deleted",
//       data: deletedTask,
//     };
//   } catch (error) {
//     return { status: false, message: error.message, data: false };
//   }
// };

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
  // hardDeleteTask,
};
