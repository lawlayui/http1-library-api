const app = require("../../main");
const validator = require('./validator');
const models =require('./models');
const service = require('./service');


app.addRoute('POST', '/users',async (req, res) => {
	let data = '';
	req.on('data', (chunk) => {
		data += chunk;
	});

	req.on('end', () => {
		data = JSON.parse(data);
		data['role'] = 'user';
		const validator_result = validator(data);
		if (validator_result['status'] == 'error') {
			res.writeHead(422, {'content-type': 'text/plain'});
			res.end(validator_result['message']);
		}

	});
});

app.addRoute('GET', '/users', async (req, res) => {
	const queryString = app.queryString;
	const result = service.select_users('select * from users where username = ?', [queryString['username']]);
	result 
		.then((rows) => {
			console.log("Dari route: ",result);
			res.writeHead(200, {'content-type': 'application/json'});
			res.end(JSON.stringify(rows));
		})
		.catch((err) => {
			console.log(err);
		});
});