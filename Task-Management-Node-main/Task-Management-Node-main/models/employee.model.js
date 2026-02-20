const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  gender: { type: String, enum: ['Male', 'Female'] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  isDelete: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
