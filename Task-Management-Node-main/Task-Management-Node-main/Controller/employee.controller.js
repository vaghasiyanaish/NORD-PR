const Employee = require("../models/employee.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
exports.registerEmployee = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender, role } = req.body;
    if (!firstname || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    const employee = await Employee.create({
      firstname,
      lastname,
      email,
      password: hash,
      gender,
      role,
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
// exports.loginEmployee = async (req, res) => {
//   const { email, password } = req.body;

//   const employee = await Employee.findOne({ email });
//   if (!employee) return res.status(404).json({ message: "User not found" });

//   const match = await bcrypt.compare(password, employee.password);
//   if (!match) return res.status(400).json({ message: "Wrong password" });

//   const token = jwt.sign(
//     { employeeId: employee._id, role: employee.role },
//     "employee_secret",
//     { expiresIn: "1d" }
//   );

//   res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
//   res.json({ message: "Login success" });
// };
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });
  if (!employee) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, employee.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { employeeId: employee._id, role: employee.role },
    "employee_secret",
    { expiresIn: "1d" }
  );

  // 🔥 VERY IMPORTANT
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.json({ message: "Login success" });
};

// Logout
exports.logoutEmployee = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout success" });
};

// Profile
exports.myProfile = (req, res) => {
  res.json({ data: req.user });
};

// Update Profile
exports.updateEmployeeProfile = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true }
  );
  res.json({ message: "Profile updated", data: updated });
};

// Change Password
exports.changePassword = async (req, res) => {
  const { current_pass, new_pass } = req.body;

  const isMatch = await bcrypt.compare(current_pass, req.user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong current password" });

  const hash = await bcrypt.hash(new_pass, 10);
  await Employee.findByIdAndUpdate(req.user._id, { password: hash });

  res.json({ message: "Password changed" });
};
