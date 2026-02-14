const app = require("../main.js");
const security = require('./security.js');


const now = new Date();

// 
app.addMiddleware((req, res) => {
	let param = req.url.split('?');
	req.url = param[0];
	app.routeKey = `${req.method} ${req.url}`;
	param = param[1];
	if (!param) {
		return null;
	}
	param = param.split('&');
	param = param.map((value) => {return value.split('=')});
	app.queryString = Object.fromEntries(param);
});


app.addMiddleware((req, res) => {
	const headers = req.headers;
	let token = null;
	const free_route = ['POST /users/register', 'POST /users/login'];
	if (free_route.includes(app.routeKey)) {
		return;
	}
	if (!headers['authorization']) {
		res.writeHead(400, {'content-type': 'text/plain'});
		res.end('Missing header authorization');
		return;
	}
	try {
		token = headers['authorization'].split(' ')[1];
		const result_verify = security.verifyJWT(token);
		if (result_verify['status'] === 'error') {
			res.writeHead(422, {'content-type': 'text/plain'});
			res.end(result_verify['message']);
		}
		app.claims = result_verify;
	}catch(err) {
		res.writeHead(422, {'content-type': 'text/plain'});
		res.end('wrong format must be bearer token');
		return;
	}
});

app.addMiddleware((req, res) => {
	const needJSONroute = ['POST /users/register', 'POST /users/login'];
	if (needJSONroute.includes(app.routeKey)) {
		if (req.headers['content-type'] === 'application/json') {
			return;
		}else {
			res.writeHead(400, {'content-type': 'text/plain'});
			res.end('missing json');
			return;
		}
	}else {
		return;
	}
});
