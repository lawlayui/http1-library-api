const { verify_hash } = require('../../core/security');


module.exports = async (passwordHashed, password) => {
    const isValid = await verify_hash(password, passwordHashed);
    if (isValid.status === 'succes') {
        return {
            status: 'succes',
            message: 'succes logined'
        };
    }
    return {
        status: 'error',
        message: 'invalid password'
    };
};