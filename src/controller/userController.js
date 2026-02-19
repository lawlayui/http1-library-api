const userService = require('../services/users/userService');
const { generate_jwt } = require('../core/security');


module.exports.createUsers = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', async () => {
        data = JSON.parse(data);
        if (data.username || data.password) {
            const result = await userService.createUsers(data.username, data.password);
            if (result['status'] === 'error') {
                res.writeHead(422, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ status: 'error', message: result.message }));
                return;
            }
            res.writeHead(201, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                status: 'succes',
                data: result['user_id'],
                token: 'You need login'
            }));

            return;
        };
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            status: 'error',
            message: 'username or password not find'
        }));
    });
};

module.exports.getUsers = async (req, res) => {
    const result = await userService.getUsers();
    if (result) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'succes', data: result }));
        return;
    }
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'resource not found' }));

};

module.exports.getUsersById = async (req, res) => {
    const result = await userService.getUsersByIdOrUsername(req.paramPath);
    if (result) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'succes', data: { username: result.username, role: result.role } }));
        return;
    }
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'resource not found' }));
};

module.exports.userLogin = async (req, res) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', async () => {
        data = JSON.parse(data);
        if (data.password || data.username) {
            const result_read = await userService.getUsersByIdOrUsername(null, data.username);
            const password_hashed = result_read.password;
            const result_login = await userService.userLogin(password_hashed, data.password);

            if (result_login.status === 'error') {
                res.writeHead(401, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ status: 'error', message: result_login.message }));
                return;
            };
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ status: 'succes', token: await generate_jwt({ user_id: result_read.id, role: result_read.role }) }));
            return;
        };
        res.writeHead(422, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'missing key error' }));
        return;
    });
};

module.exports.changeRole = async (req, res) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', async () => {
        data = JSON.parse(data);
        if (data.user_id && data.role) {
            if (req.claims.payload.role === 'user') {
                res.writeHead(422, {'content-type': 'application/json'});
                res.end(JSON.stringify({status: 'error', message: 'role must be admin'}));
                return;
            };
            const result = await userService.changeRole(data.user_id, data.role);
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify({status: 'succes', message: 'relogin to change payload'}));
            return;
        };
        res.writeHead(422, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: 'missing key user_id or role'}));
    });
};