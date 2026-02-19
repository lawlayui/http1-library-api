const { verify_jwt } = require('../core/security');


module.exports = async (req, res) => {
    let token;
    const free_route = ['POST /users', 'POST /users/register', 'POST /users/login', 'GET /'];
    const path = `${req.method} ${req.url}`;
    const headers = req.headers
    if (free_route.includes(path)) {
        return;
    }
    if (!headers['authorization']) {
        res.writeHead(401, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: 'Missing header authorization'}));
        return;
    }
    token = headers.authorization;
    token = token.split('Bearer ')[1];
    if (!token) {
        res.writeHead(401, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: 'Authorization scheme must be Bearer'}));
        return;
    }
    const claims = await verify_jwt(token);
    if (claims['status'] === 'error') {
        res.writeHead(401, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: claims.message}));
        return;
    }
    if (!claims.data) {
        res.writeHead(401, {'content-type': 'application/json'});
        res.end(JSON.stringify({status: 'error', message: 'Invalid token'}));
        return;
    }
    req.claims = claims.data;
    return;
};