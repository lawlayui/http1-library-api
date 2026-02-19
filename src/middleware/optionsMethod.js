


module.exports = async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {'access-control-allow-origin': 'http://localhost:3000', 'access-control-allow-headers': 'authorization'});
        res.end();
        return;
    }
    return;
};