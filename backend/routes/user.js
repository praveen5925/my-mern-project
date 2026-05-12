const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/progress', protect, async (req, res) => {
  try {
    const { subject, score } = req.body;
    const user = await User.findById(req.user._id);
    if (user.progress[subject] !== undefined) {
      user.progress[subject] = (user.progress[subject] + score) / 2;
    }
    await user.save();
    res.json(user.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/quiz-result', protect, async (req, res) => {
  try {
    const { quizId, score, total, subject } = req.body;
    const user = await User.findById(req.user._id);
    
    user.quizResults.push({ quizId, score, total, date: Date.now() });
    
    if (subject && user.progress[subject] !== undefined) {
      const percent = (score / total) * 100;
      user.progress[subject] = (user.progress[subject] + percent) / 2;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (user.lastActive && new Date(user.lastActive).setHours(0, 0, 0, 0) < today) {
      user.streak += 1;
    }
    user.lastActive = Date.now();
    
    await user.save();
    res.json({ streak: user.streak, quizResults: user.quizResults });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const totalQuizzes = user.quizResults.length;
    const totalScore = user.quizResults.reduce((acc, r) => acc + r.score, 0);
    const totalMax = user.quizResults.reduce((acc, r) => acc + r.total, 0);
    const avgScore = totalQuizzes > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
    
    res.json({
      totalQuizzes,
      avgScore,
      streak: user.streak,
      progress: user.progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).sort({ 'quizResults.date': -1 });
    res.json(user.quizResults.slice(0, 50));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;