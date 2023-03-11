const { Attendee, Event } = require('../models');
const {getEventWithCountOfAttendees} = require('./event.service');

const craeteAttendee = async (body) => {
    return await Attendee.create(body);
};

const getAllAttendees = async () => {
    return await Attendee.find({}, '-events');
}

const getAttendeeById = async (id) => {
    return await Attendee.findById(id)
}

const getAttendeeeByEmail = async (email) => {
    return await Attendee.findOne({ email: email });
}

const addAttendeeToEvent = async (eventId, attendeeId) => {
    await Attendee.findByIdAndUpdate(attendeeId, { $push: { events: eventId } });
    return await Event.findByIdAndUpdate(eventId, { $push: { attendees: attendeeId } })
};

const removeAttendeeFromEvent = async (eventId, attendeeId) => {
    Event.findById(eventId, function (err, event) {
        if (err) {
            console.log(err);
        } else {
            // Remove the attendee from the attendees array
            const index = event.attendees.indexOf(attendeeId);
            if (index > -1) {
                event.attendees.splice(index, 1);
            }

            // Save the event
            event.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Attendee removed from event successfully');
                }
            });
        }
    })
}

const deleteAttendee = async (attendeeId) => {
    return await Attendee.findOneAndDelete(attendeeId);
}

const updateAttendee = async (attendeeId, updateBody) => {
    const attendee = await Attendee.findByIdAndUpdate(attendeeId, updateBody, { new: true });
    if (!attendee) {
        return "Attendee not found"
    }
    return attendee;
};

const averageAttendee = async () => {
    const totalAttendees = await Attendee.countDocuments();
    const totalEvents = await Event.countDocuments();
    const average = totalAttendees * 100 / totalEvents ;
    return { average: String(average) + "%" };
};

const popularEvents = async () => {
    return await Attendee.aggregate([
        {
            $unwind: '$events'
        },
        {
            $group: {
                _id: '$events',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        },
        {
            $limit: 1
        },
        {
            $lookup: {
                from: 'events',
                localField: '_id',
                foreignField: '_id',
                as: 'event'
            }
        },
        {
            $project: {
                name: '$event.title',
                count: 1
            }
        }
    ]);
};

module.exports = {
    popularEvents,
    averageAttendee,
    updateAttendee,
    deleteAttendee,
    addAttendeeToEvent,
    craeteAttendee,
    getAttendeeById,
    getAttendeeeByEmail,
    getAllAttendees,
    removeAttendeeFromEvent
}