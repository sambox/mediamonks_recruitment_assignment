
module.exports = class ResponseMock {
    status(status) {
        this.status = status;
        return {
            send: (msg) => {
                this.msg = msg
            }
        }
    }
    sendStatus(status) {
        this.status = status;
    }
}