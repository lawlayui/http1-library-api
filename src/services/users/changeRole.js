const { getConnection } = require('../../core/getConnection');

module.exports = async (userId, role) => {
    const connection = await getConnection();
    try {
        await connection.beginTransaction();
        const result = await connection.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
        await connection.commit();
        return result;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        await connection.release();
    }
};