const Task = require("../models/task");

// Fetch all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedUsers", "name email profilePic")
      .sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Fetch task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignedUsers", "name email profilePic");
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, startDate, duration, assignedUsers, checklist } = req.body;
    const newTask = new Task({ title, description, priority, status, startDate, duration, assignedUsers, checklist });
    const savedTask = await newTask.save();
    const populatedTask = await Task.findById(savedTask._id).populate("assignedUsers", "name email profilePic");
    return res.status(201).json(populatedTask);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Update entire task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("assignedUsers", "name email profilePic");
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
      .populate("assignedUsers", "name email profilePic");
    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
};