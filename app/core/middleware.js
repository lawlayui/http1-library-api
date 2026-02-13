const app = require("../main.js");

const now = new Date();

// 
app.addMiddleware((req, res) => {
	const user = `\nIP: ${req.socket.remoteAddress} \nMethod: ${req.method} \nURL: ${req.url} \nDate: ${now.toUTCString()}`;
	console.log(user);
});

// 
app.addMiddleware((req, res) => {
	let param = req.url.split('?');
	req.url = param[0];
	param = param[1];
	param = param.split('&');
	param = param.map((value) => {return value.split('=')});
	app.queryString = Object.fromEntries(param);
});