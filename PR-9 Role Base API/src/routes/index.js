const express = require("express")

const routes = express.Router();

routes.use("/auth", require("./auth.routes"));
routes.use("/Admin", require("./admin.routes"));
routes.use("/Manager", require("./manager.routes"));
routes.use("/employee", require("./employee.routes"));


module.exports = routes;