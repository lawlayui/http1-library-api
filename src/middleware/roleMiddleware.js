

module.exports = async (req, res) => {
    const routeAdmin = ['PATCH /users', 'POST /books'];
    const target = `${req.method} ${req.url}`;
    if (routeAdmin.includes(target)) {
        const role = req.claims.payload.role;
        if (role === 'user') {
            res.writeHead(422, {'content-type': 'application/json'});
            res.end(JSON.stringify({status: 'error', message: 'role must be admin'}));
            return;
        };
        return;
    };
    return;
};