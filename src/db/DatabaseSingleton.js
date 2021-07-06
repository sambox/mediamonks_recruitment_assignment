require('dotenv').config();
const LoggerSingleton = require('../lib/LoggerSingleton');
const logger = new LoggerSingleton().getInstance();
const dbToConnect = require('./connector.json');
const fs = require('fs');

class DbController {
    constructor() {
        try {
            if (process.env.NODE_ENV === 'development') {
                if (!fs.existsSync(process.env.DB_SQLITE_FOLDER)) {
                    fs.mkdirSync(process.env.DB_SQLITE_FOLDER);
                }
            }
            this.db = require('knex')(dbToConnect[process.env.NODE_ENV]);
            this.initTable();
        } catch (error) {
            logger.error(`Error trying to connect database: ${JSON.stringify(error)}`)
        }
    }

    async initTable() {
        try {
            const exists = await this.db.schema.hasTable(process.env.DB_TABLE);
            if (!exists) {
                logger.warn(`TABLE DOES NOT EXISTS. Creating a new one.`)
                await this.db.schema.createTable(process.env.DB_TABLE, t => {
                    t.string('key').primary();
                    t.text('value').notNullable();
                });
            }
        } catch (error) {
            logger.error(`Error trying to INITIALIZE database: ${JSON.stringify(error)}`);
        }
    }

    getDb() {
        return this.db;
    }

}

module.exports = class DatabaseSingleton {
    constructor() {
        if (!DatabaseSingleton.instance) {
            DatabaseSingleton.instance = new DbController();
        }
    }

    getInstance() {
        return DatabaseSingleton.instance;
    }
}