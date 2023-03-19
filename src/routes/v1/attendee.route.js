const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const attendeeValidation = require('../../validations/attendee.validation');
const attendeeController = require('../../controllers/attendee.controller');

const router = express.Router();

router.delete('/:attendeeId', auth('eventManager'), validate(attendeeValidation.deleteAttendee), attendeeController.deleteAttendee);
router.get('/', auth('eventManager'), attendeeController.getAllAttendees);
router.patch('/:attendeeId', auth(), validate(attendeeValidation.updateAttendee), attendeeController.updateAttendee);
router.get('/average', auth('eventManager'), attendeeController.averageAttendee);
router.get('/popular-event', auth('eventManager'), attendeeController.popularEvent);

module.exports = router;