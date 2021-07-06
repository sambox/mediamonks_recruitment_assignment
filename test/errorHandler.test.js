const assert = require('assert');
const errorHandler = require('../src/lib/ErrorHandler');
const ResponseMock = require('./mocks/ResponseMock');

describe('ErrorHandler Test', () => {
    it('Should throw object with a message and a code', () => {
        const msg = 'Lorem impsum dolor sit amet';
        const code = 500;
        const errorMock = {
            message: msg,
            code: code
        }

        let throwedError1;
        try {
            errorHandler.errorFactory(msg, code)
        } catch (error) {
            throwedError1 = error;
        }

        assert.deepStrictEqual(throwedError1, errorMock);
    });

    it('Should update response attributes', () => {
        const msg = 'Lorem impsum dolor sit amet';
        const code = 500;
        const mock = new ResponseMock();
        mock.status(code).send(msg);
        const res = new ResponseMock();
        errorHandler.responseErrorMessage(res, msg, code);
        assert.deepStrictEqual(res, mock);
        assert.strictEqual(res.msg, msg);
        assert.strictEqual(res.status, code);
    });

    it('Should throw a string message', () => {
        let err;
        try {
            errorHandler.responseErrorMessage(undefined);
        } catch (error) {
            err = error;
        }
        assert.strictEqual(err, "ERROR: responseErrorMessage, no response received.");
    });

    it('Should throw a string message', () => {
        let err;
        try {
            errorHandler.handleError();
        } catch (error) {
            err = error;
        }
        assert.strictEqual(err, "ERROR: handleError, no response received.");
    });

});