require('dotenv').config();
const kvpService = require('../service/KeyValuePairService');
const schemaValidator = require('../schemaValidator/keyValuePair.joi');
const LoggerSingleton = require('../lib/LoggerSingleton');
const logger = new LoggerSingleton().getInstance();

exports.socketManager = socket => {
    logger.debug('New socket connection.');
    setTimeout(() => {
        try {
            socket.disconnect(true);
            logger.debug('Socket disconnected successfully');
        } catch (err) {
            logger.error(`error on disconnect: ${err}`);
        }
    }, process.env.NODE_ENV === 'production' ? process.env.PROD_SOCKET_TIMEOUT : process.env.DEV_SOCKET_TIMEOUT);

    socket.on('keyValuePair', async keyValuePair => {
        logger.debug(JSON.stringify(keyValuePair));
        try {
            schemaValidator.validate(keyValuePair)
            await kvpService.save(keyValuePair);
        } catch (error) {
            logger.error(`Error on save ${JSON.stringify(error)}`);
            socket.emit('error', error);
        }
    })
}