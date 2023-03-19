const express = require('express');
const validate = require('../../middlewares/validate');
const eventController = require('../../controllers/event.controller');
const attendeeController = require('../../controllers/attendee.controller');
const auth = require('../../middlewares/auth');
const eventValidation = require('../../validations/event.validation');

const router = express.Router();

router.post('/', auth(), validate(eventValidation.createEvent), eventController.createEvent);
router.get('/', auth(), eventController.getUserEventWithAttendee);
router.get('/all', auth('eventManager'), eventController.getAllEvent);
router.get('/count', eventController.getEventWithCountOfAttendees);
router.get('/:eventId', auth('eventManager'), validate(eventValidation.getEventById), eventController.getEventById);
router.delete('/:eventId', auth('eventManager'), validate(eventValidation.getEventById), eventController.deleteEvent);
router.patch('/:eventId', auth(), validate(eventValidation.updateEvent), eventController.updateEvent);
router.patch('/:eventId/status', auth('eventManager'), validate(eventValidation.adminUpdateEvent), eventController.updateEvent);
router.post('/:eventId', auth(), validate(eventValidation.addAttendee),  attendeeController.addAttendeeToEvent);
router.get('/attendees/:eventId', auth(), validate(eventValidation.getEventById), eventController.getEventAttendees);
router.delete('/:eventId/attendee/:attendeeId', auth(), validate(eventValidation.removeAttendeeFromEvent), attendeeController.removeAttendeeFromEvent);

module.exports = router;