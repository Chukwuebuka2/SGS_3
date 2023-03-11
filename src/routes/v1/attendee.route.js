const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const attendeeValidation = require('../../validations/attendee.validation');
const attendeeController = require('../../controllers/attendee.controller');

const router = express.Router();

router.delete('/:attendeeId', auth(), validate(attendeeValidation.deleteAttendee), attendeeController.deleteAttendee);
router.get('/', auth(), attendeeController.getAllAttendees);
router.patch('/:attendeeId', validate(attendeeValidation.updateAttendee), attendeeController.updateAttendee);
router.get('/average', auth(), attendeeController.averageAttendee);
router.get('/popular-event', attendeeController.popularEvent);

module.exports = router;