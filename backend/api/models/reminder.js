
const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Reminder = mongoose.model('Reminder', ReminderSchema);

module.exports = Reminder;
