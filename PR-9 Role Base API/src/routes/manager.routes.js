const express = require("express");
const { verifyRole, verifyToken } = require("../middleware/verify.middleware");
const { deleteUser, editUser, viewAllUsers, changePassword } = require("../controller/common.controller");
const uploadImage = require("../middleware/multer.middleware");
const { registerUser } = require("../controller/auth.controller");

const routes = express.Router();


routes.post("/add", verifyToken, verifyRole("Admin"), uploadImage.single("profileImage") , registerUser)
routes.put("/delete", verifyToken, verifyRole("Admin", "Manager"), deleteUser)
routes.put("/edit", verifyToken, verifyRole("Admin", "Manager"), editUser)
routes.get("/viewAllusers", verifyToken, verifyRole("Manager"), viewAllUsers);
routes.put("/change-password", verifyToken, verifyRole("Admin" , "Manager"), changePassword);

module.exports = routes;