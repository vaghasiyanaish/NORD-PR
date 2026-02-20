const express = require('express');
const router = express.Router();
const employeeRoutes = require("./employee.routes");
const taskRoutes = require("./task.routes");

router.use("/employee", employeeRoutes);
router.use("/task", taskRoutes);

module.exports = router;