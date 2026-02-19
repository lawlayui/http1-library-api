const userService = require('../services/users/userService');
const { generate_jwt } = require('../core/security');

const sendError = (res, statusCode, message) => {
    res.writeHead(statusCode, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message }));
};

const sendSuccess = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'content-type': 'application/json' });
    res.end(JSON.stringify(data));
};

const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(data));
            } catch (err) {
                reject(err);
            }
        });
    });
};

module.exports.createUsers = async (req, res) => {
    try {
        const data = await parseRequestBody(req);
        if (!data.username || !data.password) {
            return sendError(res, 400, 'username or password not found');
        }

        const result = await userService.createUsers(data.username, data.password);
        if (result.status === 'error') {
            return sendError(res, 422, result.message);
        }

        sendSuccess(res, 201, {
            status: 'succes',
            data: result.user_id,
            token: 'You need login'
        });
    } catch (err) {
        sendError(res, 400, 'Invalid request body');
    }
};

module.exports.getUsers = async (req, res) => {
    const result = await userService.getUsers();
    if (result) {
        return sendSuccess(res, 200, { status: 'succes', data: result });
    }
    sendError(res, 404, 'resource not found');
};

module.exports.getUsersById = async (req, res) => {
    const result = await userService.getUsersByIdOrUsername(req.paramPath);
    if (result) {
        return sendSuccess(res, 200, {
            status: 'succes',
            data: { username: result.username, role: result.role }
        });
    }
    sendError(res, 404, 'resource not found');
};

module.exports.userLogin = async (req, res) => {
    try {
        const data = await parseRequestBody(req);
        if (!data.password || !data.username) {
            return sendError(res, 422, 'missing username or password');
        }

        const user = await userService.getUsersByIdOrUsername(null, data.username);
        if (!user) {
            return sendError(res, 404, 'user not found');
        }

        const loginResult = await userService.userLogin(user.password, data.password);
        if (loginResult.status === 'error') {
            return sendError(res, 401, loginResult.message);
        }

        const token = await generate_jwt({ user_id: user.id, role: user.role });
        sendSuccess(res, 200, { status: 'succes', token });
    } catch (err) {
        sendError(res, 400, 'Invalid request body');
    }
};

module.exports.changeRole = async (req, res) => {
    try {
        const data = await parseRequestBody(req);
        if (!data.user_id || !data.role) {
            return sendError(res, 422, 'missing user_id or role');
        }

        if (req.claims.payload.role === 'user') {
            return sendError(res, 422, 'role must be admin');
        }

        await userService.changeRole(data.user_id, data.role);
        sendSuccess(res, 200, { status: 'succes', message: 'relogin to change payload' });
    } catch (err) {
        sendError(res, 400, 'Invalid request body');
    }
};