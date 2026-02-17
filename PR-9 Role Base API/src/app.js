require("dotenv").config()

const express = require("express")
const port = process.env.PORT || 8000
const dbConnect = require("./config/dbConnect.config")

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api", require('./routes'));

app.listen(port, () => {

  console.log(`Server Start at http://localhost:${port}`);
})