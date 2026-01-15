const Blog = require("../model/blog-model");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("view-blogs", { blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).render("error", {
      message: "An error occurred while fetching blogs."
    });
  }
};

exports.renderAddBlog = (req, res) => {
  res.render("add-blog");
};

exports.addBlog = async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            category: req.body.category,
            tags: req.body.tags ? req.body.tags.split(',') : [],
            blogImage: req.file ? req.file.filename : ""
        });

        await blog.save();

        res.redirect("/blog/view-blogs");   
    } catch (error) {
        console.log(error);
        res.redirect("/blog/error");
    }
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).render("error", { message: "Blog not found" });
    }

    res.render("single-blog", { blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).render("error", { message: "Something went wrong" });
  }
};

exports.renderEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).render("error", { message: "Blog not found" });
    }
    res.render("edit-blog", { blog });
  } catch (error) {
    res.status(500).render("error", { message: "Error loading blog" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
      const tags = req.body && req.body.tags
  ? req.body.tags.split(",").map(t => t.trim())
  : [];

    await Blog.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      tags,
      blogImage: req.file ? req.file.filename : req.body.oldImage
    });

    res.redirect("/blog/view-blogs");

  } catch (error) {
    res.status(500).render("error", { message: "Update failed" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/blog/view-blogs");
  } catch (error) {
    res.status(500).render("error", { message: "Delete failed" });
  }
};
