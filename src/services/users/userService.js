const getUser = require('./getUser');
const getUsersByIdOrUsername = require('./getUserByIdOrUsername');
const createUser = require('./createUser');
const userLogin = require('./usersLogin');
const changeRole = require('./changeRole');


module.exports.getUsers = getUser;
module.exports.getUsersByIdOrUsername = getUsersByIdOrUsername;
module.exports.createUsers = createUser;
module.exports.userLogin = userLogin;
module.exports.changeRole = changeRole;