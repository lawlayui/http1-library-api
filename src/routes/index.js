const usersRotues = require('./usersRoutes');
const booksRouets = require('./booksRoutes');


const routes = {...usersRotues};


module.exports = async (req, res) => {
    const handler = routes[`${req.method} ${req.url}`];
    if (handler) {
        if (!res.writableEnded) {
            await handler(req, res);
        }
        return;
    };
    res.writeHead(404, {'cotent-type': 'application/json'});
    res.end(JSON.stringify({
        message: 'resource not found'
    }));
    
};

