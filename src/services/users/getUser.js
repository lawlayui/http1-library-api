const {pool} = require('../../core/getConnection');
const eventBus = require('../../events/eventBus');


module.exports = async () => {
        const [result] = await pool.query('select id, username, role from users');
        return result;
}

