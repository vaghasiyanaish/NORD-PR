

const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    content: { type: String, required: true, trim: true, minlength: 10 },
    author: { type: String, required: true, trim: true, minlength: 3, maxlength: 50 },
    category: { 
      type: String, 
      required: true, 
      enum: ["Technology", "Health", "Education", "Travel", "Other"] 
    },
    blogImage: { type: String }, 
    tags: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads")); 
  },
  filename: (req, file, cb) => {
    cb(null, `blogImage-${Date.now()}${path.extname(file.originalname)}`); 
  }
});

blogSchema.statics.uploadImage = multer({ storage: storage }).single("blogImage");

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
