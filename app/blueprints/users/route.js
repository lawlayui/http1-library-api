const app = require("../../main");
const validator = require('./validator');
const service = require('./service');


app.addRoute('POST', '/users/login', async (req, res) => {
	let data = '';
	req.on('data', (chunk) => {
		data += chunk;
	}); 

	req.on('end', async () => {
		data = JSON.parse(data);
		const validation = validator(data);
		if (validation['status'] === 'error') {
			res.writeHead(422, {'content-type': 'text/plain'});
			res.end(validation['message']);
			return;
		}
		try {
			const token = await service.login(data['username'], data['password']);
			res.writeHead(200, {'content-type': 'text/plain'});
			res.end(token);
			return;
		} catch(err) {
			console.log(err);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('internal server error');
			return;
		}
	});

});


app.addRoute('POST', '/users/register',async (req, res) => {
	let data = '';
	req.on('data', (chunk) => {
		data += chunk;
	});
	
	req.on('end', async () => {
		data = JSON.parse(data);
		const validation = validator(data);
		if (validation['status'] == 'error') {
			res.writeHead(422, {'content-type': 'text/plain'});
			res.end(validation['message']);
			return;
		}
		try {
			const message = await service.insert_users(`insert into users(username, password, role) values(?, ?, ?)`, [data.username, data.password, 'user']);
			res.writeHead(201, {'content-type': 'text/plain'});
			res.end(message);
		} catch(err) {
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end(err['message']);
			return;
		}
	});
});

app.addRoute('GET', '/users', async (req, res) => {
	const queryString = app.queryString;
	if (!queryString) {
		res.writeHead(400, {'content-type': 'text/plain'});
		res.end("Missing query string");
		return;
	}
	const result = service.select_users('select username, role from users where username = ?', [queryString['username']]);
	result 
		.then((rows) => {
			if (rows[0]['status'] === 'error') {
				res.writeHead(400, {'content-type': 'text/plain'});
				res.end(JSON.stringify(rows[0]));
				return;
			}
			res.writeHead(200, {'content-type': 'application/json'});
			res.end(JSON.stringify(rows[0][0]));
		})
		.catch((err) => {
			console.error(err);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('internal server error');
		});
});


app.addRoute('PATCH', '/users', async (req, res) => {
	const claims = await app.claims;
	if (claims['role'] !== 'admin') {
		res.writeHead(422, {'content-type': 'text/plain'});
		res.end('Only admins can access this route');
		return;
	}
	let data = '';
	req.on('data', (chunk) => {
		data += chunk;
	});
	req.on('end', async () => {
		data = JSON.parse(data);
		await service.update_role(data.username, data.role);
		res.writeHead(200, {'content-type': 'text/plain'});
		res.end('re-login to feel the changes');
	});
	req.on('error', (err) => {
		console.log(err);
		res.writeHead(500, {'content-type':'text/plain'});
		res.end('internal server error');
	});

});