const usersRotues = require('./usersRoutes');
const bookRoutes = require('./booksRoutes');


const routes = {...usersRotues, ...bookRoutes};


module.exports = async (req, res) => {
    const handler = routes[`${req.method} ${req.url}`];
    if (handler) {
        return handler;
    };
};

