const User = require("../models/user.model");
const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt")

exports.userProfile = async (req, res) => {
  try {
    return res.json({ status: 200, user: req.user })
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: 'Server Error' });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    let userId = req.user._id;
    let user = await User.findByIdAndUpdate(userId, { isDelete: true })
    console.log(user);
    return res.json({ status: 200, user: req.user, message: "User Delete Successfully" })
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: 'Server Error' });
  }
}

exports.hardDelete = async (req, res) => {
  try {
    let userId = req.query.id;
    let user = await User.findById(userId)

    if (user.profileImage && user.profileImage != "") {
      let imagePath = path.join(__dirname, "..", user.profileImage)
      fs.unlinkSync(imagePath)
      console.log(imagePath);
    }

    await User.findByIdAndDelete(userId)

    return res.json({ status: 200, message: "User Permenent Delete Successfully" })
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: 'Server Error' });
  }
}

exports.editUser = async (req, res) => {
  try {
    let userId = req.user._id;
    let singleUser = await User.findById(userId);
    console.log(singleUser);
    let imagePath = singleUser.profileImage;

    if (req.file) {
      let oldImage = singleUser.profileImage;

      if (oldImage && oldImage !== "") {
        let oldImagepath = path.join(__dirname, "..", oldImage.replace(/^\//, ""));
        console.log("Trying to delete:", oldImagepath);

        try {
          fs.unlinkSync(oldImagepath);
          console.log("Old Image Deleted Successfully");
        } catch (error) {
          console.log("Old image not found or already deleted");
        }
      }

      imagePath = `uploads/${req.body.role}-Images/${req.file.filename}`;
    }


    const { password, ...body } = req.body;

    let updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...body,
        profileImage: imagePath,
      },
      { new: true }
    );

    console.log(updatedUser);
    return res.json({ status: 200, user: req.user, message: "User Edited Successfully" })
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: 'Server Error' });
  }
}

exports.viewAllUsers = async (req, res) => {
  try {
    let allUser = await User.find();
    let allAdmin = await User.find({ role: "Admin" });
    let allManager = await User.find({ role: "Manager" });
    let allEmployee = await User.find({ role: "Employee" });

    if (req.user.role === "Admin") {
      return res.json({ status: 200, users: allUser, message: "All Users Fetched Successfully" });
    }
    else if (req.user.role === "Manager") {
      return res.json({
        status: 200,
        managers: allManager,
        employees: allEmployee,
        message: "All Users Fetched Successfully"
      });
    }

  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Something went wrong!" });
  }
};

exports.allDeletedUsers = async (req, res) => {
  try {
    let allDeletedUser = await User.find({ isDelete: true });
    return res.json({ status: 200, users: allDeletedUser, message: "All Delted Users Fetched Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Something went wrong!" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    let id = req.user._id;
    let user = await User.findById(id);

    let decryptPass = await bcrypt.compare(req.body.password, user.password)
    console.log(decryptPass);

    if (decryptPass) {

      let newPassword = req.body.newPassword;
      let hashPass = await bcrypt.hash(newPassword, 10)

      await User.findByIdAndUpdate(id, { password: hashPass })
      return res.json({ status: 200, message: "Password Change Successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Something went wrong!" });
  }
};

