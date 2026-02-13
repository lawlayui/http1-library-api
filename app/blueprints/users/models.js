const db = require('../../core/db');

class Models {
    constructor() {

    }

    async select_users(sql, parms) {
        db.get_db()
            .then(() => {
                db.query(sql, parms)
                    .then((value) => {
                        console.log("Dari models: ", value);
                        return value;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                return {
                    status: 'error',
                    message: toString(err)
                }
            });
    }
}

const models = new Models();

module.exports = models;

