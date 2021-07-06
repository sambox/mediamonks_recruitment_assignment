require('dotenv').config();
const DbSingleton = require('../db/DatabaseSingleton');
const db = new DbSingleton().getInstance().getDb();
const LoggerSingleton = require('../lib/LoggerSingleton');
const logger = new LoggerSingleton().getInstance();
const table = 'key_value_pair';
const utils = require('../lib/ErrorHandler');

exports.save = async keyValuePair => {
    const total = await db(table).count('key as cnt').where('key', keyValuePair.key);
    if (total[0].cnt === 0) {
        logger.debug(`inserting: ${JSON.stringify(keyValuePair)} in ${process.env.DB_TABLE}`)
        try {
            await db(table).insert(keyValuePair);
            return true;
        } catch (error) {
            logger.error("ERROR: " + JSON.stringify(error));
        }
    } else {
        const msg = `ERROR: key ${keyValuePair.key} already exists`;
        utils.errorFactory(msg, 500);
        logger.error(msg);
    }
}

exports.findAll = () => {
    logger.debug(`findAll in ${process.env.DB_TABLE}`)
    return db(table).select();
}

exports.findById = id => {
    logger.debug(`findById key: ${id} in ${process.env.DB_TABLE}`);
    return db(table).where('key', id).select().first();
}

exports.deleteById = id => {
    logger.debug(`findAll in ${process.env.DB_TABLE}`)
    return db(table).where('key', id).del();
}