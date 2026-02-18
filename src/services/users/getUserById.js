const { pool } = require('../../core/getConnection');


module.exports = async (user_id) => {
    const [result] = await pool.query('select id, username, role from users where id = ?', [user_id]);
    return result[0];
};  