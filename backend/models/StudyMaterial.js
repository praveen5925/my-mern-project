const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  subject: { 
    type: String, 
    enum: ['History', 'Geography', 'Polity', 'Economy', 'Science', 'Environment', 'Ethics'],
    required: true 
  },
  topic: String,
  type: { type: String, enum: ['Notes', 'Summary', 'Quick Review', 'Mind Map'], default: 'Notes' },
  importantPoints: [String],
  keyTerms: [String],
  createdAt: { type: Date, default: Date.now }
});

materialSchema.index({ subject: 1, topic: 1 });

module.exports = mongoose.model('StudyMaterial', materialSchema);