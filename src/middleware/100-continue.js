


module.exports = async (req, res) => {
    if (req.headers['expect'] === '100-continue') {
        const size = req.headers['content-length'];
        const max = 5 * 1024;
        if (size >= max) {
            res.writeHead(422, {'content-type': 'application/json'});
            res.end(JSON.stringify({status: 'error', message: 'to large'}));
            return;
        };
        res.writeContinue();
        return;
    };
};