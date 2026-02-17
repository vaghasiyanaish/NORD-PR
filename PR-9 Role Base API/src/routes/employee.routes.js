const express = require("express");
const { verifyRole, verifyToken } = require("../middleware/verify.middleware");
const { deleteUser, editUser, changePassword } = require("../controller/common.controller");
const uploadImage = require("../middleware/multer.middleware");
const { registerUser } = require("../controller/auth.controller");

const routes = express.Router();


routes.post("/add", verifyToken, verifyRole("Admin", "Manager"), uploadImage.single("profileImage"), registerUser)
routes.put("/delete", verifyToken, deleteUser)
routes.put("/edit", verifyToken, uploadImage.single("profileImage"), editUser)
routes.put("/change-password", verifyToken, changePassword);



module.exports = routes;