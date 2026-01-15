
const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb+srv://prajapatijay0729_db_user:ZgP0WrMXXBnKkfSf@cluster0.2m9kulu.mongodb.net/AdminAndBlog?retryWrites=true&w=majority")
    .then(() => console.log("Database connected successfully..."))
    .catch(err => console.error("Database Connection Error:", err));
};

module.exports = dbconnect;