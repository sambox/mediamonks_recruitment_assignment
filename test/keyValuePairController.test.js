const assert = require('assert');
const kvpController = require('../src/controller/KeyValuePairController');
const ResponseMock = require('./mocks/ResponseMock');
const RequestMock = require('./mocks/RequestMock');

const timeMills = new Date().getTime();
const keyPrefix = 'KVP_TEST_KEY_';
const valuePrefix = 'KVP_TEST_VALUE_';
const testObj1 = { key: keyPrefix + timeMills, value: valuePrefix + '1' };
const testObj2 = { key: keyPrefix + timeMills * 2, value: valuePrefix + '2' };

describe('KeyValuePairController Test', () => {
    it('Should return status 200 and the saved object', async () => {
        const reqMock = new RequestMock();
        const resMockReceived = new ResponseMock();
        const resMockSent = new ResponseMock();

        reqMock.body = testObj1;
        resMockReceived.status(200).send(testObj1);

        let throwedError1;
        try {
            await kvpController.save(reqMock, resMockSent);
        } catch (error) {
            throwedError1 = error;
        }
        assert.deepStrictEqual(resMockSent, resMockReceived);
        assert.strictEqual(throwedError1, undefined);
    });

    it('Should return status 500 and an error object', async () => {
        const reqMock = new RequestMock();
        const resMockReceived = new ResponseMock();
        const resMockSent = new ResponseMock();
        const errorMock = {
            message: `ERROR: key ${testObj1.key} already exists`,
            code: 500
        };

        reqMock.body = testObj1;
        resMockReceived.status(500).send(errorMock);

        let throwedError1;
        try {
            await kvpController.save(reqMock, resMockSent);
        } catch (error) {
            throwedError1 = error;
        }
        assert.deepStrictEqual(resMockSent, resMockReceived);
        assert.strictEqual(throwedError1, undefined);
    });

    it('Should return an array of objects including the previouslly saved object', async () => {
        const reqMock = new RequestMock();
        const resMockSent = new ResponseMock();
        await kvpController.findAll(reqMock, resMockSent);

        const obj1 = resMockSent.msg.find(kvp => kvp.key === testObj1.key);
        assert.strictEqual(Array.isArray(resMockSent.msg), true);
        assert.notStrictEqual(obj1, undefined);
    });

    it('Should return status 200 and the expected object', async () => {
        const reqMock = new RequestMock();
        const resMockReceived = new ResponseMock();
        const resMockSent = new ResponseMock();

        reqMock.params = {
            key: testObj1.key
        };
        resMockReceived.status(200).send(testObj1);

        let throwedError1;
        try {
            await kvpController.findById(reqMock, resMockSent);
        } catch (error) {
            throwedError1 = error;
        }
        assert.deepStrictEqual(resMockSent, resMockReceived);
        assert.strictEqual(throwedError1, undefined);
    });

    it('Should return status 404 and an error object', async () => {
        const reqMock = new RequestMock();
        const resMockReceived = new ResponseMock();
        const resMockSent = new ResponseMock();
        const errorMock = {
            message: `KeyValuePair not found for id: ${testObj2.key}`,
            code: 404
        };

        reqMock.params = {
            key: testObj2.key
        };
        resMockReceived.status(404).send(errorMock);

        let throwedError1;
        try {
            await kvpController.findById(reqMock, resMockSent);
        } catch (error) {
            throwedError1 = error;
        }
        assert.deepStrictEqual(resMockSent, resMockReceived);
        assert.strictEqual(throwedError1, undefined);
    });

    it('Should return status 200', async () => {
        const reqMock = new RequestMock();
        const resMockReceived = new ResponseMock();
        const resMockSent = new ResponseMock();
        reqMock.params = {
            key: testObj1.key
        };
        resMockReceived.status(200).send();
        let throwedError1;
        try {
            await kvpController.deleteById(reqMock, resMockSent);
        } catch (error) {
            throwedError1 = error;
        }
        assert.deepStrictEqual(resMockSent, resMockReceived);
        assert.strictEqual(throwedError1, undefined);
    });

    it('Should return status 404 and an error object', async () => {
        const reqMock = new RequestMock();
        const resMockReceived = new ResponseMock();
        const resMockSent = new ResponseMock();
        const errorMock = {
            message: `KeyValuePair not found for id: ${testObj2.key}`,
            code: 404
        };
        reqMock.params = {
            key: testObj2.key
        };
        resMockReceived.status(404).send(errorMock);

        let throwedError1;
        try {
            await kvpController.deleteById(reqMock, resMockSent);
        } catch (error) {
            throwedError1 = error;
        }
        assert.deepStrictEqual(resMockSent, resMockReceived);
        assert.strictEqual(throwedError1, undefined);
    });
});