const utils = require('../lib/ErrorHandler')

module.exports = function schemaValidatorBase(data, schema) {
    const {error: err} = schema.validate(data);
    if (!!err) {
        utils.errorFactory(err.details, 400)
    }
}