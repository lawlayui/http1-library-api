const userController = require('../controller/userController');
const doct = require('../controller/doct');

module.exports = {
    'GET /': doct,
    'GET /users': userController.getUsers,
    'GET /users/': userController.getUsersById,
    'POST /users': userController.createUsers
}