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
	host: "smtp-mail.outlook.com",
	secureConnection: false,
	port: 587,
	tls: {
		ciphers: "SSLv3",
	},
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

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
			sender: "adewemimoabiona@outlook.com",
			to: process.env.EMAIL,
			subject: "Contact Request",
			text: `${data.name} <${data.email}> \n${data.message}`,
		};
		transporter.sendMail(mail, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).send("Something went wrong.");
			} else {
				res.status(200).sendFile(process.cwd() + "/public/sent.html");
			}
		});
	});
});

app.listen(port);
console.log(`Server running on port ${port}`.yellow.bold);
