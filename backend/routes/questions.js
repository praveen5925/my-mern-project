const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', async (req, res) => {
  try {
    const { subject, topic, difficulty, limit = 20, page = 1 } = req.query;
    const query = {};
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;

    const questions = await Question.find(query).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const count = await Question.countDocuments(query);

    res.json({ questions, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/random', async (req, res) => {
  try {
    const { subject, count = 10 } = req.query;
    const query = subject ? { subject } : {};
    const questions = await Question.aggregate([{ $match: query }, { $sample: { size: parseInt(count) } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/daily', async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/subject/:subject', async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subject }).limit(50);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;