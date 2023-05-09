const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    organizer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    location: {
        type: String
    },
    attendees: [{
        type: String,
        ref: 'User'
    }],
    timestamps: {
        type: Date,
        default: Date.now
    }
  });
  
  const calendarSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    events: [eventSchema]
  });
  
  module.exports = mongoose.model('Calendar', calendarSchema);