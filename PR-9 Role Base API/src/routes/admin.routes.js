const express = require("express");
const { verifyToken, verifyRole } = require("../middleware/verify.middleware");
const { userProfile, deleteUser, editUser, viewAllUsers, allDeletedUsers,  hardDelete} = require("../controller/common.controller");
const uploadImage = require("../middleware/multer.middleware");


const routes = express.Router();

routes.get("/profile", verifyToken, verifyRole("Admin"), userProfile);
routes.put("/delete", verifyToken, verifyRole("Admin"), deleteUser);
routes.get("/hard-delete", verifyToken, verifyRole("Admin"), hardDelete);
routes.put("/edit", verifyToken, verifyRole("Admin", "Manager"), uploadImage.single("profileImage"), editUser);
routes.get("/viewAllusers", verifyToken, verifyRole("Admin"), viewAllUsers);
routes.get("/allDeletedUsers", verifyToken, verifyRole("Admin"), allDeletedUsers);
routes.get("/allDeletedUsers", verifyToken, verifyRole("Admin"), allDeletedUsers);




module.exports = routes;