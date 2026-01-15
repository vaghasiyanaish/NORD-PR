const express = require("express");
const blogRoutes = express.Router();
const Blog = require("../model/blog-model");

const {
  renderAddBlog,
  getAllBlogs,
  addBlog,
  renderEditBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controller/blog.controller");

blogRoutes.get("/add-blog", renderAddBlog);

blogRoutes.post(
  "/add-blog",
  Blog.uploadImage,   
  addBlog
);

blogRoutes.get("/view-blogs", getAllBlogs);

blogRoutes.get("/view-blog/:id", getSingleBlog);

blogRoutes.get("/edit-blog/:id", renderEditBlog);

blogRoutes.post(
  "/edit-blog/:id",
  Blog.uploadImage,
  updateBlog
);

blogRoutes.post("/delete-blog/:id", deleteBlog);

module.exports = blogRoutes;
