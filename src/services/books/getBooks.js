const { pool } = require('../../core/getConnection');

module.exports = async () => {
    const [rows] = await pool.query('SELECT * FROM books');
    return rows;
};