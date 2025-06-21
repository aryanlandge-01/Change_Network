const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const { status, assignedTo } = req.query;
    const filter = {};
    if (status) {
      filter.status = status;
    }
    if (assignedTo) {
      filter.assignedTo = { $regex: assignedTo, $options: "i" };
    }
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const task = new Task({
    title,
    description,
    assignedTo,
    status,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.status = req.body.status || task.status;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      await task.deleteOne();
      res.json({ message: "Task removed" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};
