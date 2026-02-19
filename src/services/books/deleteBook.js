const {getConnection} = require('../../core/getConnection');
const eventBus = require('../../events/eventBus');

module.exports = async (bookId) => {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT path FROM books WHERE id = ?', [bookId]);
    if (rows.length === 0) {
        throw new Error('Book not found');
    }
    const filePath = rows[0].path;
    eventBus.emit('deleteBook', filePath);
    const [result] = await connection.execute('DELETE FROM books WHERE id = ?', [bookId]);
    return result.affectedRows > 0;
};