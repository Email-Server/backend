const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  organizerEmail: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  attendees: [String],
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Calendar", calendarSchema);
