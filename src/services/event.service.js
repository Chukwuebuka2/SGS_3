const { Event } = require('../models');

const createEvent = async (eventBody, organizerId) => {
    return await Event.create({...eventBody, organizer: organizerId});
};

const getAllEvent = async () => {
    return await Event.find().populate('attendees', 'name email phoneNumber');
};

const getEventById = async (id) => {
    return await Event.findById(id).populate('attendees', 'name email phoneNumber').populate('organizer', 'name email')
};

const getEventAttendees = async (id) => {
    return await Event.findById(id).select('-title -description -date -location').populate({ path: 'attendees', select: '-events' });
}

const deleteEvent = async (id) => {
    return await Event.findByIdAndDelete(id);
};

const updateEvent = async (id, organizer, updateBody) => {
    return await Event.updateOne({ id, organizer }, updateBody, { new: true })//.findByIdAndUpdate(id, { ...updateBody }, { new: true });
}

const getEventWithCountOfAttendees = async () => {
    return await  Event.aggregate([
        { $lookup: { from: 'attendees', localField: 'attendees', foreignField: '_id', as: 'attendeeDetails' } },
        { $unwind: '$attendeeDetails' },
        { $group: { _id: '$_id', title: { $first: '$title' }, date: { $first: '$date' }, location: { $first: '$location' }, attendeesCount: { $sum: 1 } } },
    ]);
};

const getUserEventWithAttendee = async (userId) => {
    return await Event.find({ organizer: userId }).populate({ path: 'attendees', select: '-events' })
}


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