const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'digital_library_admin',
    password: 'Digital_Library_Admin@123',
    database: 'digital_library',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

const pool = mysql.createPool(config);

async function getConnection() {
    const connection = await pool.getConnection();
    return connection;
}

module.exports = {
    pool,
    getConnection
}