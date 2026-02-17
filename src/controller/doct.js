

module.exports = async (req, res) => {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({
        'GET /': 'Ddocumentation',
        'GET /users': 'Taking all users',
        'GET /users/:id': 'Retrieving users by ID',
        'POST /users': 'Create an account (role will be user)'
    }));
}