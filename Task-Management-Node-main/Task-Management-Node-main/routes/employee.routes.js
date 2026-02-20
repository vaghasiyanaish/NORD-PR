const express = require('express');
const routes = express.Router();
const { verifyEmployeeToken } = require('../middleware/verifyToken');
const controller = require('../Controller/employee.controller');

routes.post("/register", controller.registerEmployee);
routes.post("/login", controller.loginEmployee);
routes.post("/logout", verifyEmployeeToken, controller.logoutEmployee);

routes.get("/profile", verifyEmployeeToken, controller.myProfile);
routes.put("/update-profile", verifyEmployeeToken, controller.updateEmployeeProfile);
routes.post("/change-password", verifyEmployeeToken, controller.changePassword);

module.exports = routes;
