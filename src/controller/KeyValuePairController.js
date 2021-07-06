const kvpService = require('../service/KeyValuePairService');
const LoggerSingleton = require('../lib/LoggerSingleton');
const logger = new LoggerSingleton().getInstance();
const utils = require('../lib/ErrorHandler');
const schemaValidator = require('../schemaValidator/keyValuePairId.joi');

exports.save = async (req, res) => {
    try {
        await kvpService.save(req.body)
        res.status(200).send(req.body);
    } catch (error) {
        logger.error(`/keyValuePair - Error: ${JSON.stringify(error)}`);
        utils.handleError(res, error);
    }
}

exports.findAll = async (req, res) => {
    try {
        const kvpList = await kvpService.findAll();
        res.status(200).send(kvpList);
    } catch (error) {
        logger.error(`/keyValuePair - Error: ${JSON.stringify(error)}`);
        utils.handleError(res, error);
    }
}

exports.findById = async (req, res) => {
    const key = req.params.key
    try {
        schemaValidator.validate({ key: key })
        const kvp = await kvpService.findById(key);
        res.status(200).send(kvp);
    } catch (error) {
        logger.error(`/keyValuePair/${key} - Error:  ${JSON.stringify(error)}`);
        utils.handleError(res, error);
    }
}

exports.deleteById = async (req, res) => {
    const key = req.params.key
    try {
        schemaValidator.validate({ key: key })
        const kvp = await kvpService.deleteById(key);
        res.status(200).send();
    } catch (error) {
        logger.error(`/keyValuePair/${key} - Error:  ${JSON.stringify(error)}`);
        utils.handleError(res, error);
    }
}