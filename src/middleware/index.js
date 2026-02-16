const middlewares  = [require('./queryString')];

module.exports = async (req, res) => {
    for (const fn of middlewares) {
        await fn(req, res);
        if (res.writableEnded) break;
    };
};

