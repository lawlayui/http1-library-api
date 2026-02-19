

module.exports = async (req, res) => {
    const notJSON = ['POST /books'];
    const target = `${req.method} ${req.url}`
    if (!notJSON.includes(target) && !req.method === 'GET') {
        const headers = req.headers;
        const header = 'application/json';
        if (headers['content-type'] === header) {
            return;
        };
        res.writeHead(415, {'content-type': 'application/json'});
        res.end(JSON.stringify({
            status: 'error',
            message: 'unsupported media type'
        }));
    }
};