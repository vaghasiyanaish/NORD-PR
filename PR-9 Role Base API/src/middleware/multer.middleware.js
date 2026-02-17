const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath;

    switch (req.body.role) {
      case "Admin":
        folderPath = "src/uploads/Admin-Images";
        break;
      case "Employee":
        folderPath = "src/uploads/Employee-Images";
        break;
      case "Manager":
        folderPath = "src/uploads/Manager-Images";
        break;
      default:
        folderPath = "src/uploads";
    }

    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    cb(null, `IMG-${Date.now()}`);
  },
});

const uploadImage = multer({ storage });

module.exports = uploadImage;