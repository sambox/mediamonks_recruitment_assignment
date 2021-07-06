const responseErrorMessage = (res, msg = 'ERROR', cod = 500) => {
    if (!res) {
        throw "ERROR: responseErrorMessage, no response received.";
    }
    res.status(cod).send(msg)
}

const handleError = (res, e) => {
    if (!res) {
        throw "ERROR: handleError, no response received.";
    }
    if (!e) {
        res.sendStatus(500)
    }
    const code = e.code ? e.code : 500;
    const body = {
        code: code,
        message: e.message ? e.message : 'ERROR'
    }
    responseErrorMessage(res, body, code)
}

const errorFactory = (message, code) => {
    throw {
        message: message,
        code: code
    }
}

module.exports = {
    responseErrorMessage,
    handleError,
    errorFactory
}