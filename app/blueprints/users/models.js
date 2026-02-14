const db = require('../../core/db');

class Models {
    constructor() {

    }

    async select_users(sql, parms) {
        try{
            await db.get_db()
            const fetch = await db.connect.execute(sql, parms);
            return fetch;
        } catch (err) {
            console.error(err);
            return {
                status: 'error',
                code: 500            }
        }
    }

    async insert_users(sql, parms) {
        try {
            await db.get_db()
            await db.connect.execute(sql, parms);
            return 'succes';
        } catch (err) {
            throw err;
        }
    }

    async update_users(username, role) {
        try {
            const sql = `update users set role = ? where username = ?`
            await db.get_db()
            await db.connect.execute(sql, [role, username]);
            return 'succes';
        } catch(err) {
            throw err;
        }
    }
}

const models = new Models();

module.exports = models;

