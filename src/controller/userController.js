const userService = require('../services/users/userService');

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
    const result = await userService.getUsersById(req.paramPath);
    if (result) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ status: 'succes', data: result }));
        return;
    }
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'resource not found' }));
};

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
                res.writeHead(422, {'content-type': 'application/json'});
                res.end(JSON.stringify({status: 'error', message: result.message}));
                return;
            }
            res.writeHead(201, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                status: 'succes',
                data: result['user_id']
            }));
            return;
        };
        res.writeHead(400, {'content-type': 'application/json'});
        res.end(JSON.stringify({
            status: 'error',
            message: 'username or password not find'
        }));
    });
};