const winston = require('winston');
require('dotenv').config();

class Logger {
    constructor() {
        const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        });
        this.logger = winston.createLogger({
            level: process.env.LOGLEVEL,
            format: winston.format.combine(
                winston.format.label({ label: process.env.PROJECT_PREFIX }),
                winston.format.timestamp(),
                myFormat
            ),
            defaultMeta: { service: process.env.PROJECT_PREFIX + '-service' },
            transports: [
                new winston.transports.Console({ json: false, timestamp: true }),
                new winston.transports.File({ filename: `logs/${process.env.PROJECT_PREFIX}_combined.log` })
            ]
        })
    }

    debug(msg) {
        this.logger.debug(msg);
    }

    info(msg) {
        this.logger.info(msg);
    }

    warn(msg) {
        this.logger.warn(msg);
    }

    error(msg) {
        this.logger.error(msg);
    }
}

module.exports = class LoggerSingleton {
    constructor() {
        if (!LoggerSingleton.instance) {
            LoggerSingleton.instance = new Logger();
        }
    }
  
    getInstance() {
        return LoggerSingleton.instance;
    }
}