const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 3
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Symptom', SymptomSchema);