const dal = require('../DAL/KeyValuePairDAL');
const LoggerSingleton = require('../lib/LoggerSingleton');
const logger = new LoggerSingleton().getInstance();
const utils = require('../lib/ErrorHandler');

exports.save = keyValuePair => {
    return dal.save(keyValuePair);
}

exports.findAll = async () => {
    return await dal.findAll();
}

exports.findById = async (id) => {
    const kvp = await dal.findById(id);
    if (!kvp) {
        const errorMsg = `KeyValuePair not found for id: ${id}`;
        logger.error(errorMsg);
        utils.errorFactory(errorMsg, 404);
    }
    return kvp;
}

exports.deleteById = async (id) => {
    const kvp = await dal.deleteById(id);
    if (!kvp) {
        const errorMsg = `KeyValuePair not found for id: ${id}`;
        logger.debug(errorMsg);
        utils.errorFactory(errorMsg, 404);
    }
    return kvp;
}