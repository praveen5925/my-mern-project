const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://api.dicebear.com/7.x/initials/svg?seed=UPSC' },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  quizResults: [{
    quizId: String,
    score: Number,
    total: Number,
    date: { type: Date, default: Date.now }
  }],
  progress: {
    history: { type: Number, default: 0 },
    geography: { type: Number, default: 0 },
    polity: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    environment: { type: Number, default: 0 },
    ethics: { type: Number, default: 0 }
  },
  streak: { type: Number, default: 0 },
  lastActive: Date,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);