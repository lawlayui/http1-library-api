const bcrypt = require('bcrypt');
const jose = require("jose");


module.exports.generate_hashed = async (password) => {
    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);
    console.log(hashed);
    return {
        status: 'succes',
        data: hashed
    };
};

module.exports.verify_hash = async (password, password_hashed) => {
    const result = await bcrypt.compare(password, password_hashed);
    if (result) {
        return {
            status: 'succes'
        };
    }else {
        return {
            status: 'error'
        };
    }
};
