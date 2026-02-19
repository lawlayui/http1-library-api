const http = require('http'); //Default http/1.1
const middleware = require('./src/middleware');
const matchRoute = require('./src/routes');
const logger = require('./src/core/logger');

const server = http.createServer(async (req, res) => {
    res.on('finish', async () => {
        await logger(req, res);
    });
    try {
        await middleware(req, res);
        const handler = await matchRoute(req, res);
        if (handler) {
            if (!res.writableEnded) {
                await handler(req, res);
                return;
            }
        }
        if (!res.writableEnded && !handler) {
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: 'resource not found' }));
        }
    } catch (err) {
        console.log(err);
        if (!res.writableEnded) {
            res.writeHead(500, { 'content-type': 'application/json' });
            res.end(JSON.stringify({
                message: 'internal server error'
            }));
        };
    };
});

const port = 5000;
const host = '127.0.0.1';

server.listen(port, host, () => {
    console.log(`server listen on ${host}:${port}`);
});