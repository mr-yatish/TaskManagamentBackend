const { taskService, userService } = require("../services");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, user, progress, date, startfrom, endto } = req.body;

    const taskData = {
      title,
      user,
      progress,
      date,
      startfrom,
      endto,
    };
    // Validate required fields
    if (!title || !user || !progress || !date || !startfrom || !endto) {
      return res.status(400).json({
        status: false,
        message: "Please provide all required fields",
        data: false,
      });
    }
    //   Validate user exists
    const userExists = await userService.checkUserExits(user);
    if (!userExists) {
      return res
        .status(400)
        .json({ status: false, message: "User not found", data: false });
    }

    const response = await taskService.createTask(taskData);
    return res.status(response.status === true ? 201 : 400).json(response);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

// Task List
const getTaskList = async (req, res) => {
  try {
    const response = await taskService.getAllTasks();
    return res.status(response.status === true ? 200 : 400).json(response);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

// Get Task By ID
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const response = await taskService.getTaskById(taskId);
    return res.status(response.status === true ? 200 : 400).json(response);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, progress, date, startfrom, endto } = req.body;
    const updateData = {
      title,
      progress,
      date,
      startfrom,
      endto,
    };
    const response = await taskService.updateTask(taskId, updateData);
    return res.status(response.status === true ? 200 : 400).json(response);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const response = await taskService.deleteTask(taskId);
    return res.status(response.status === true ? 200 : 400).json(response);
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      data: false,
    });
  }
};

module.exports = {
  createTask,
  getTaskList,
  getTaskById,
  updateTask,
  deleteTask,
};
