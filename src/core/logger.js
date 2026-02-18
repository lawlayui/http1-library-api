


module.exports = (req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.socket.remoteAddress} --> ${req.method} ${req.url} --> ${res.statusCode}`);
};