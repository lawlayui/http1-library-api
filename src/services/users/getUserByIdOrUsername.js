const { pool } = require('../../core/getConnection');


module.exports = async (userId = null, username = null) => {
    let sql = 'SELECT * FROM users WHERE ';
    const params = [];

    if (userId) {
        sql += 'id = ? ';
        params.push(userId);
    }
    if (username) {
        sql += 'username = ? ';
        params.push(username);
    }

    const [result] = await pool.query(sql, params);
    return result[0];
};