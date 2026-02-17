const { getConnection } = require('../../core/getConnection');


module.exports = async (username, password) => {
    const connection = await getConnection();
    if (username.length <= 3) {
        return {
            status: 'error',
            message: 'username length must be at least 3 characters'
        }
    }
    if (password.length <= 8) {
        return {
            status: 'error',
            message: 'password length must be at least 3 characters'
        }
    }
    try {
        await connection.beginTransaction()
        const [ result ] = await connection.query('insert into users(username, password, role) values(?, ?, ?)', [username, password, 'user']);
        await connection.commit();
        return {
            status: 'succes',
            user_id: result.insertId
        }
    }catch(err) {
        await connection.rollback();
        return {
            status: 'error',
            message: err.message
        }
    }finally {
        await connection.release();
    }
};