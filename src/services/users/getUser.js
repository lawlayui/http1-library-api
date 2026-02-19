const { pool } = require('../../core/getConnection');

module.exports = async () => {
    const [result] = await pool.query('SELECT id, username, role FROM users');
    return result;
};

