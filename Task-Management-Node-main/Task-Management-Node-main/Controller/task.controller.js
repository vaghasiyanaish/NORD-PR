const Task = require("../models/task.model");
const Employee = require("../models/employee.model");

// Create task (admin)
exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);

  await Employee.findByIdAndUpdate(req.body.assignedTo, {
    $push: { tasks: task._id }
  });

  res.status(201).json({ message: "Task created", data: task });
};

// All tasks (admin)
exports.viewAllTasks = async (req, res) => {
  const tasks = await Task.find({ isDelete: false }).populate("assignedTo");
  res.json(tasks);
};

// My tasks
exports.viewMyTasks = async (req, res) => {
  const tasks = await Task.find({
    assignedTo: req.user._id,
    isDelete: false,
  });
  res.json(tasks);
};

// Update task
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (
    req.user.role !== "admin" &&
    task.assignedTo.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

// Delete task
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { isDelete: true });
  res.json({ message: "Task deleted" });
};
