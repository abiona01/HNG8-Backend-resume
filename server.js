const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const colors = require("colors");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "*" }));

app.use("/", express.static(process.cwd() + "/public"));

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

// verify connection configuration
transporter.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take messages");
	}
});

app.post("/send", (req, res) => {
	let form = new multiparty.Form();
	let data = {};
	form.parse(req, function (err, fields) {
		console.log(fields);
		Object.keys(fields).forEach(function (property) {
			data[property] = fields[property].toString();
		});
		console.log(data);
		const mail = {
			sender: `${data.name} <${data.email}>`,
			to: process.env.EMAIL,
			subject: "Contact Request",
			text: `${data.name} <${data.email}> \n${data.message}`,
		};
		transporter.sendMail(mail, (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.status(200).send("Email successfully sent!");
			}
		});
	});
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
	res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(port);
console.log(`Server running on port ${port}`.yellow.bold);
