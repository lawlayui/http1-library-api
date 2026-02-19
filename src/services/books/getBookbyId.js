const { pool } = require('../../core/getConnection');


module.exports = async (book_id) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM books WHERE id = ?', [book_id]);
        return result[0];
    }catch(err) {
        throw err;
    };
};