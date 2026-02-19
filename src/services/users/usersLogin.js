const { verify_hash } = require('../../core/security');


module.exports = async (password_hashed, password) => {
    if (verify_hash(password, password_hashed)) {
        return {
            status: 'succes',
            message: 'succes logined'
        };
    };
    return {
        status: 'error',
        message: 'invalid password'
    };
};