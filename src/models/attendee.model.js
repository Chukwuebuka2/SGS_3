const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const validator = require('validator');

const attendeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    phoneNumber: {
        type: String,
    },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

attendeeSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const attendee = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!attendee;
  };

attendeeSchema.plugin(toJSON);
attendeeSchema.plugin(paginate);

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;