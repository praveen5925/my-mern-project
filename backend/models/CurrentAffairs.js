const mongoose = require('mongoose');

const affairSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: String,
  date: { type: Date, required: true },
  category: { 
    type: String, 
    enum: ['National', 'International', 'Economy', 'Science & Tech', 'Environment', 'Sports', 'Govt Schemes', 'Awards'],
    required: true 
  },
  tags: [String],
  source: String,
  importance: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  createdAt: { type: Date, default: Date.now }
});

affairSchema.index({ date: -1, category: 1 });

module.exports = mongoose.model('CurrentAffairs', affairSchema);