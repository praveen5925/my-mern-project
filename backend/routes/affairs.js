const express = require('express');
const router = express.Router();
const CurrentAffairs = require('../models/CurrentAffairs');

router.get('/', async (req, res) => {
  try {
    const { category, month, limit = 20, page = 1 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (month) {
      const startDate = new Date(month + '-01');
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const affairs = await CurrentAffairs.find(query).sort({ date: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const count = await CurrentAffairs.countDocuments(query);

    res.json({ affairs, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const affairs = await CurrentAffairs.find().sort({ date: -1 }).limit(10);
    res.json(affairs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const affairs = await CurrentAffairs.find({
      date: { $gte: today, $lt: tomorrow }
    }).sort({ importance: -1 });

    res.json(affairs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const affair = await CurrentAffairs.findById(req.params.id);
    if (!affair) return res.status(404).json({ message: 'Not found' });
    res.json(affair);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;