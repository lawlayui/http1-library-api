const jose = require('jose');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');
require('dotenv').config();


class Security {
    constructor() {
        this.secret = new TextEncoder().encode(process.env.SECRET_KEY);
    }

    async generateJWT(payload) {
        const token = await new jose.SignJWT(payload)
            .setExpirationTime('1y')
            .setProtectedHeader({alg: 'HS256'})
            .sign(this.secret);

        return token;
    }

    async verifyJWT(token) {
        try {
            const { payload } = await jose.jwtVerify(token, this.secret);
            return payload;
        } catch(err) {
            return {
                status: 'error',
                message: 'invalid token'
            }
        }
    }

    async generateUUID(len) {
        const id = nanoid.nanoid(len);
        return id;
    }

    async generateHash(password, len) {
        const hashed = await bcrypt.hash(password, len);
        return hashed;
    }

    async verifyHash(password, hash) {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}

const security = new Security();

module.exports = security;