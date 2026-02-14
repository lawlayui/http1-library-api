const models = require('./models');
const security = require('../../core/security');


class Service {
    constructor() {

    }

    async select_users(sql, parms) {
        if (!parms) {
            return [{
                status: 'error',
                message: 'Minimal 1 params'
            }]
        }
        try {
            const fetch = await models.select_users(sql, parms);
            return fetch
        } catch (err) {
            throw new Error(err);
        }
    } 

    async insert_users(sql, parms) {
        const password_hash = await security.generateHash(parms[1], 10);
        const parms1 = [parms[0], password_hash, parms[2]];

        const result = await models.insert_users(sql, parms1);
        const payload = {
            username: parms1[0],
            user_id: result.insertId
        }
        const token = security.generateJWT(payload);
        return token;
    }


}
const service = new Service();

module.exports = service;