const { getConnection } = require('../../core/getConnection');

module.exports = async (filePath, filename, author, description, release_date, user_id, book_id) => {
    const connection = await getConnection();
    let sql = 'update books set ';
    let params = [];
    if (filePath) {
        sql += 'path = ?, ';
        params.push(filePath);
    }
    if (filename) {
        sql += 'title = ?, ';
        params.push(filename);
    }
    if (author) {
        sql += 'author = ?, ';
        params.push(author);
    }
    if (description) {
        sql += 'description = ?, ';
        params.push(description);
    }
    if (release_date) {
        sql += 'release_date = ?, ';
        params.push(release_date);
    }
    sql = sql.slice(0, -2); 
    sql += ' WHERE id = ? AND created_by = ?';
    params.push(book_id, user_id);
    try {
        const [result] = await connection.execute(sql, params);
        return result;
    }catch(err) {
        connection.rollback();
        throw err;
    }
}