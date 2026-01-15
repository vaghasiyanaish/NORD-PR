const express = require("express");
const port = 8005;
const path = require("path");
const dbconnect = require("./config/dbconnection");
const cookieParser = require("cookie-parser");

const app = express();
dbconnect();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.use("/", require("./routes/index.routes"));
app.use("/blog", require("./routes/blog.routes")); 

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
