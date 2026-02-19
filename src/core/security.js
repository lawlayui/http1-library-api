const bcrypt = require('bcrypt');
const jose = require("jose");
const uuid = require('uuid');
require('dotenv').config();


module.exports.generate_hash = async (password) => {
    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);
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

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
module.exports.generate_jwt = async (payload) => {
    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setExpirationTime('1y')
        .sign(secretKey);
    return jwt;
};

module.exports.verify_jwt = async (token) => {
    try {
        const calims = await jose.jwtVerify(token, secretKey);
        return {
            status: 'succes',
            data: calims
        };
    }catch(err) {
        return {
            status: 'error',
            message: err.message
        }
    }
};

module.exports.generate_uuid = async () => {
    return uuid.v4();
};
