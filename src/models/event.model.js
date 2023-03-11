const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee'}],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;