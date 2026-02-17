const userController = require('../controller/userController');


module.exports = {
    'GET /users': userController.getUsers,
    'GET /users/': userController.getUsersById,
    'POST /users': userController.createUsers
}