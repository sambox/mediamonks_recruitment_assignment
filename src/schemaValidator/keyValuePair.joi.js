const validator = require('./schemaValidatorBase')
const Joi = require('joi');

const keyValueSchema = Joi.object(
    {
        key: Joi.string().required(),
        value: Joi.string().insensitive().required()
    }
)

exports.validate = obj => {
    validator(obj, keyValueSchema);
}