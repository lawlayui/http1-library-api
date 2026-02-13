const models = require('./models');


class Service {
    constructor() {

    }

    async select_users(sql, parms) {
        if (parms === null) {
            console.log("return error");
            return {
                status: 'error',
                message: 'parms is null'
            }
        }
        const result = models.select_users(sql, parms);
        result
            .then((v) => {
                console.log("Dari service: ", result);
                return v;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    } 


}
const service = new Service();

module.exports = service;