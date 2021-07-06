const assert = require('assert');
const loggerSingleton = require('../src/lib/LoggerSingleton');

describe('loggerSingleton Test', () => {
    it('Should return the same Logger instance', () => {
        const loggerObj = new loggerSingleton().getInstance();
        assert.deepStrictEqual(new loggerSingleton().getInstance(), loggerObj);
    });
});