const assert = require('assert');
const kvpSvc = require('../src/service/KeyValuePairService');
// mocks
const timeMills = new Date().getTime();
const keyPrefix = 'KVP_TEST_KEY_';
const valuePrefix = 'KVP_TEST_VALUE_';
const testObj1 = { key: keyPrefix + timeMills, value: valuePrefix + '1' };
const testObj2 = { key: keyPrefix + timeMills * 2, value: valuePrefix + '2' };

describe('keyValuePairService Test', () => {
    it('Should return true after saving the KVP', async () => {
        assert.strictEqual(await kvpSvc.save(testObj1), true);
        assert.strictEqual(await kvpSvc.save(testObj2), true);
    });
    it('Should throw error object after saving a non existing KVP', async () => {
        let throwedObj;
        try {
            await kvpSvc.save(testObj1)
        } catch (error) {
            throwedObj = error;
        }
        assert.strictEqual(throwedObj.message, `ERROR: key ${testObj1.key} already exists`);
        assert.strictEqual(throwedObj.code, 500);
    });
    it('Should return previous saved object', async () => {
        const res = await kvpSvc.findById(testObj1.key);
        assert.strictEqual(res.key, testObj1.key);
        assert.strictEqual(res.value, testObj1.value);
    });
    it('Should return list of key value pairs containing the saved object', async () => {
        const res = await kvpSvc.findAll();
        const obj1 = res.find(kvp => kvp.key === testObj1.key);
        const obj2 = res.find(kvp => kvp.key === testObj2.key);
        assert.strictEqual(Array.isArray(res), true);
        assert.notStrictEqual(obj1, undefined);
        assert.notStrictEqual(obj2, undefined);
    });
    it('Should return the number of rows affected after delete on db', async () => {
        assert.strictEqual(await kvpSvc.deleteById(testObj1.key), 1);
        assert.strictEqual(await kvpSvc.deleteById(testObj2.key), 1);
    });
    it('Should throw error object after deleting a non existing KVP', async () => {
        let throwedObj;
        try {
            await kvpSvc.deleteById(testObj1.key);
        } catch (error) {
            throwedObj = error;
        }
        assert.strictEqual(throwedObj.message, `KeyValuePair not found for id: ${testObj1.key}`);
        assert.strictEqual(throwedObj.code, 404);
        try {
            await kvpSvc.deleteById(testObj2.key);
        } catch (error) {
            throwedObj = error;
        }
        assert.strictEqual(throwedObj.message, `KeyValuePair not found for id: ${testObj2.key}`);
        assert.strictEqual(throwedObj.code, 404);
    });
    it('Should throw an object after trying to find a non existing KVP', async () => {
        let throwedObj;
        try {
            await kvpSvc.deleteById(testObj1.key)
        } catch (error) {
            throwedObj = error;
        }
        assert.strictEqual(throwedObj.message, `KeyValuePair not found for id: ${testObj1.key}`);
        assert.strictEqual(throwedObj.code, 404);
    });
});