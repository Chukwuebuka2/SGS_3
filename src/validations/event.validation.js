const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string(),
        location: Joi.string(),
        date: Joi.date().min(new Date(Date.now())).required()
    })
}

const getEventById = {
    params: Joi.object().keys({
        eventId: Joi.string().custom(objectId).required()
    })
};

const removeAttendeeFromEvent = {
    params: Joi.object().keys({
        eventId: Joi.string().custom(objectId).required(),
        attendeeId: Joi.string().custom(objectId).required()
    })
}

const addAttendee = {
    params: Joi.object().keys({
        eventId: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().required(),
        phoneNumber: Joi.string()
    })
}

const updateEvent = {
    params: Joi.object().keys({
        eventId: Joi.string().required()
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        location: Joi.string(),
        date: Joi.date().min(new Date(Date.now()))
    })
};

const adminUpdateEvent = {
    params: Joi.object().keys({
        eventId: Joi.string().required()
    }),
    body: Joi.object().keys({
        status: Joi.bool(),
        reason: Joi.string()
    })
}

module.exports = {
    removeAttendeeFromEvent,
    createEvent,
    getEventById,
    updateEvent,
    addAttendee,
    adminUpdateEvent
}