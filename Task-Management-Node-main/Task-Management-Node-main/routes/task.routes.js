const express = require("express");
const routes = express.Router();
const controller = require("../Controller/task.controller");
const { verifyEmployeeToken } = require("../middleware/verifyToken");
const { checkRole } = require("../middleware/roleCheck");

routes.post("/create", verifyEmployeeToken, checkRole("admin"), controller.createTask);
routes.get("/all", verifyEmployeeToken, checkRole("admin"), controller.viewAllTasks);
routes.get("/my", verifyEmployeeToken, controller.viewMyTasks);
routes.put("/update/:id", verifyEmployeeToken, controller.updateTask);
routes.delete("/delete/:id", verifyEmployeeToken, controller.deleteTask);

module.exports = routes;
