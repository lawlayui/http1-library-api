const { getConnection } = require('../../core/getConnection');

module.exports = async (user_id, role) => {
    const connection = await getConnection();
    try {
        const result = connection.query('UPDATE users SET role = ? where id = ?', [role, user_id]);
        connection.commit();
        return result;
    }catch(err) {
        connection.rollback();
        connection.release();
        throw err;
    };
}