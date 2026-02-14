const mysql = require('mysql2/promise');
require('dotenv').config();

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
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
    
});


module.exports = db;
