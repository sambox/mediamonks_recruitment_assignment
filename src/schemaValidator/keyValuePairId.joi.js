const validator = require('./schemaValidatorBase')
const Joi = require('joi');

const keyValueSchema = Joi.object().keys(
    {
        key: Joi.string().required()
    }
)

exports.validate = obj => {
    validator(obj, keyValueSchema);
}