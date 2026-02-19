module.exports = async (req, res) => {
    console.log(`${req.socket.remoteAddress} - - [${new Date().toISOString()}]  "${req.method} ${req.url}" ${res.statusCode} -`);
};