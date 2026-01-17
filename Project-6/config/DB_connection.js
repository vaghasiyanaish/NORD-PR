const mongoose =   require("mongoose")

const DB_connection = (req, res) => {
    mongoose.connect("mongodb+srv://anishvaghasiya001_db_user:Anish%40123@cluster0.o5zwa5r.mongodb.net/blogproject")
    .then(()=> console.log("connection successfully "))
    .catch((err) =>  console.log(err))
}

module.exports = DB_connection;
