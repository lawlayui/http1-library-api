const { getConnection } = require('../../core/getConnection');
const { generate_hash } = require('../../core/security');

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

module.exports = async (username, password) => {
    if (username.length <= MIN_USERNAME_LENGTH) {
        return {
            status: 'error',
            message: 'username length must be at least 3 characters'
        };
    }
    if (password.length <= MIN_PASSWORD_LENGTH) {
        return {
            status: 'error',
            message: 'password length must be at least 8 characters'
        };
    }

    const connection = await getConnection();
    try {
        await connection.beginTransaction();
        const passwordHashed = await generate_hash(password);
        const [result] = await connection.query(
            'INSERT INTO users(username, password, role) VALUES(?, ?, ?)',
            [username, passwordHashed.data, 'user']
        );
        await connection.commit();
        return {
            status: 'succes',
            user_id: result.insertId
        };
    } catch (err) {
        await connection.rollback();
        return {
            status: 'error',
            message: err.message
        };
    } finally {
        await connection.release();
    }
};