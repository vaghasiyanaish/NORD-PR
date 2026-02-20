const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");

exports.verifyEmployeeToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Login required" });

    const decoded = jwt.verify(token, "employee_secret");
    const employee = await Employee.findById(decoded.employeeId);

    if (!employee) return res.status(401).json({ message: "Invalid user" });

    req.user = employee;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
