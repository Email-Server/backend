const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    cc: [{
        type: String,
        required: false,
    }],
    bcc: [{
        type: String,
        required: false,
    }],
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    attachment: [{
        type: String,
        required: false,
    }],
    isRead: {
        type: Boolean,
        default: false
      },
      isStarred: {
        type: Boolean,
        default: false
      },
      isImportant: {
        type: Boolean,
        default: false
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      title: {
        type:String,
        ref: 'Label'
      },
      scheduled: {
        type: Date
      },
      reminder: {
        type: Date
      },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Email', emailSchema);