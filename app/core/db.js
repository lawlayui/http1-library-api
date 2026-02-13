const mysql = require('mysql2/promise');


class Database {
    constructor(config) {
        this.config = config;
        this.connect = 'null';
    }

    async get_db() {
        if (this.connect === 'null') {
            this.connect = await mysql.createConnection(this.config);
        }
    }

    async close_db() {
        if (this.connect !== 'null') {
            await this.connect.end();
            this.connect = 'null';
        }
    }

    async query(sql, parms) {
        const [rows] = await this.connect.execute(sql, parms);
        return rows[0];
    }
}

const db = new Database({
    host: 'localhost',
    user: 'digital_library_admin',
    password: 'Digital_Library_Admin@123',
    database: 'digital_library'
    
});


module.exports = db;
