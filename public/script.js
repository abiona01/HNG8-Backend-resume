const form = document.getElementById("contact");

const formEvent = form.addEventListener("submit", (e) => {
	e.preventDefault();
	let mail = new FormData(form);
	sendMail(mail);
});

const sendMail = (mail) => {
	fetch("https://resume-not-available.herokuapp.com/send", {
		method: "post",
		body: mail,
	}).then((response) => {
		return response.json();
	});
};
