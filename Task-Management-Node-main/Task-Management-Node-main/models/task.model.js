const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    dueDate: { type: Date },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    isDelete: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
