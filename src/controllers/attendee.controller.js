const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { attendeeService, eventService, emailService } = require('../services')

const addAttendeeToEvent = catchAsync(async (req, res) => {
    let attendee = await attendeeService.getAttendeeeByEmail(req.body.email);
    if (!attendee) {
        attendee = await attendeeService.craeteAttendee(req.body);
    }
    const addAttendeeToEvent = await attendeeService.addAttendeeToEvent(req.params.eventId, attendee.id);
    const event = await eventService.getEventById(req.params.eventId);
    await emailService.sendAttendeeEmail(attendee.name, attendee.email, event.title, event.date, event.location, req.user.name, req.user.email, req.user.phoneNumber);
    res.status(httpStatus.OK).send(addAttendeeToEvent);
});

const removeAttendeeFromEvent = catchAsync(async (req, res) => {
    const removedEvent = await attendeeService.removeAttendeeFromEvent(req.params.eventId, req.params.attendeeId);
    // send the email
    const event = await eventService.getEventById(req.params.eventId);
    const attendee = await attendeeService.getAttendeeById(req.params.attendeeId)
    await emailService.sendAttendeeRemovalMail(attendee.name, attendee.email, event.title, event.location, event.date, req.user.name, req.user.email, req.user.phoneNumber);
    res.status(httpStatus.OK).send();
});

const deleteAttendee = catchAsync(async (req, res) => {
    await attendeeService.deleteAttendee(req.params.attendeeId);
    res.status(httpStatus.OK).send()
})

const getAllAttendees = catchAsync(async (req, res) => {
    const attendees = await attendeeService.getAllAttendees();
    res.status(httpStatus.OK).send(attendees);
});

const updateAttendee = catchAsync(async (req, res) => {
    const attendee = await attendeeService.updateAttendee(req.params.attendeeId, req.body);
    res.status(httpStatus.OK).send(attendee);
});

const averageAttendee = catchAsync(async (req, res) => {
    const averageAttendee = await attendeeService.averageAttendee();
    res.status(httpStatus.OK).json(averageAttendee);
});

const popularEvent = catchAsync(async (req, res) => {
    const event = await attendeeService.popularEvents();
    res.status(httpStatus.OK).send(event)
})



module.exports = {
    popularEvent,
    averageAttendee,
    getAllAttendees,
    deleteAttendee,
    addAttendeeToEvent,
    updateAttendee,
    removeAttendeeFromEvent
}