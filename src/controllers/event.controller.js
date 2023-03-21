const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { eventService, attendeeService, emailService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
    const event = await eventService.createEvent(req.body, req.user.id);
    res.status(httpStatus.CREATED).send(event);
});

const getAllEvent = catchAsync(async (req, res) => {
    const events = await eventService.getAllEvent();
    if (events.length === null || 0) {
        res.status(httpStatus.OK).send('No event have been crieted');
        return;
    }
    res.status(httpStatus.OK).send(events);
});

const getEventWithCountOfAttendees = catchAsync(async (req, res) => {
    const events = await eventService.getEventWithCountOfAttendees();
    if (events.length === null || 0) {
        res.status(httpStatus.OK).send('No event have been created');
        return;
    }
    res.status(httpStatus.OK).send(events);
});

const getEventAttendees = catchAsync(async (req, res) => {
    const attendees = await eventService.getEventAttendees(req.params.eventId);
    if (attendees.length === null || 0) {
        res.status(httpStatus.OK).send('No attendants yet');
        return;
    }
    res.status(httpStatus.OK).send(attendees);
});

const getEventById = catchAsync(async (req, res) => {
    const event = await eventService.getEventById(req.params.eventId);
    if (event === null) {
        res.status(httpStatus.OK).send("This event does not exist");
        return;
    }
    res.status(httpStatus.OK).send(event);
});

const deleteEvent = catchAsync(async (req, res) => {
    await eventService.deleteEvent(req.params.eventId);
    res.status(httpStatus.OK).send()
});

const updateEvent = catchAsync(async (req, res) => {
    const event = await eventService.updateEvent(req.params.eventId, req.user.organizer, req.body);
    const { title, date, organizer: { name, email } } = await eventService.getEventById(req.params.eventId)
    if (req.body.status === false) {
        await emailService.rejectEventEmail(name, title, date, email, req.body.reason)
    }
    res.status(httpStatus.OK).send(event);
});

const getUserEventWithAttendee = catchAsync(async (req, res) => {
    const event = await eventService.getUserEventWithAttendee(req.user.id);
    if (event === null) {
        res.status(httpStatus.OK).json({ message: "No event has been created by this user" });
        return;
    }
    res.status(httpStatus.OK).send(event);
});

module.exports = {
    createEvent,
    getAllEvent,
    getEventById,
    deleteEvent,
    updateEvent,
    getEventAttendees,
    getEventWithCountOfAttendees,
    getUserEventWithAttendee
}