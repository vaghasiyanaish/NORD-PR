const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");
const uploadImage = require("../middleware/multer.middleware");

const routes = express.Router();

routes.post("/registerUser", uploadImage.single("profileImage"), registerUser);
routes.post("/loginUser", loginUser);


module.exports = routes;