const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  color: {
    type: String,
    default: '#007bff'
  }
});

module.exports = mongoose.model('Label', labelSchema);