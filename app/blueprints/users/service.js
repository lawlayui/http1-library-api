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
        return 'account created successfully';
    }

    async login(username, password_real) {
        let result = await models.select_users('select * from users where username = ?', [username]);
        result = result[0][0]
        if (security.verifyHash(password_real, result['password'])) {
            const payload = {
                user_id: result['id'],
                role: result['role']
            }
            const token = security.generateJWT(payload);
            return token;
        }

    }

    async update_role(username, role) {
        try {
            await models.update_users(username, role);
            return;
        } catch(err) {
            console.log(err);
            return;
        }
    }


}
const service = new Service();

module.exports = service;