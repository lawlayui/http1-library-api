const middlewares  = [require('./queryString'),require('./parameterPath'),require('./optionsMethod'),require('./verifyToken'),require('./roleMiddleware'),require('./100-continue'),require('./multipartHeader'), require('./jsonMiddleware')];


module.exports = async (req, res) => {
    for (const fn of middlewares) {
        await fn(req, res);
        if (res.writableEnded) break;
    };
};

