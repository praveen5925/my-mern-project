const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  explanation: { type: String, required: true },
  subject: { 
    type: String, 
    enum: ['History', 'Geography', 'Polity', 'Economy', 'Science', 'Environment', 'Ethics', 'Current Affairs'],
    required: true 
  },
  topic: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  year: Number,
  source: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);