const http = require('http'); //Default http/1.1
const middleware = require('./src/middleware'); //Get middleware
const matchRoute = require('./src/routes'); //Match rotue

// Execution flow: middleware is executed, then match route is executed

const server = http.createServer(async (req, res) => {
    
    // Handling unexpected bugs
    try {
        await middleware(req, res);
        await matchRoute(req, res);
    } catch(err) {
        console.log(err);
        res.writeHead(500, {'content-type': 'application/json'});
        res.end(JSON.stringify({
            message: 'internal server error'
        }));
    }
});

const port = 5000;
const host = '127.0.0.1';

server.listen(port, host, () => {
    console.log(`server listen on ${host}:${port}`);
});