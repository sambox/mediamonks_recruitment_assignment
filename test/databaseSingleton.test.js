const assert = require('assert');
const dbSingleton = require('../src/db/DatabaseSingleton');

describe('dbSingleton Test', () => {
    it('Should return the same DbController instance', () => {
        const dbObj = new dbSingleton().getInstance();
        assert.deepStrictEqual(new dbSingleton().getInstance(), dbObj);
    });
});