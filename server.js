const express = require("express");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "*" }));

app.use("/", express.static(process.cwd() + "/public"));

//Index page (static HTML)
app.route("/").get(function (req, res) {
	res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(port);
console.log(`Server running on port ${port}`.yellow.bold);
