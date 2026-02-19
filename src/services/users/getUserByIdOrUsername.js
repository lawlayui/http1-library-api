const { pool } = require('../../core/getConnection');


module.exports = async (user_id=null, username=null) => {
    let sql = 'select * from users where ';
    let parms = [];

    if (user_id) {
        sql += 'id = ? ';
        parms.push(user_id);
    }
    if (username) {
        sql += 'username = ? ';
        parms.push(username); 
    }
    const [result] = await pool.query(sql, parms);
    return result[0];
};  