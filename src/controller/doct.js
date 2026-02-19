

module.exports = async (req, res) => {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({
        'GET /': 'Ddocumentation',
        'GET /users': 'Taking all users',
        'GET /users/:id': 'Retrieving users by ID',
        'POST /users': 'Create an account (role will be user)',
        'POST /users/register': 'Create an account (role will be user)',
        'POST /users/login': 'Login account to get token',
        'PATCH /users': 'Change role by admin',
        'POST /books': 'upload books'
    }));
}