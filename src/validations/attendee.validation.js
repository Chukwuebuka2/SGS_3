const Joi = require('joi');
const { objectId } = require('./custom.validation');

const deleteAttendee = {
    params: Joi.object().keys({
        attendeeId: Joi.string().custom(objectId).required()
    })
}

const updateAttendee = {
    params: Joi.object().keys({
        attendeeId: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string(),
        phoneNumber: Joi.string()
    })
}

module.exports = {
    deleteAttendee,
    updateAttendee,
}