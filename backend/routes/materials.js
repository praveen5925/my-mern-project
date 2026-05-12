const express = require('express');
const router = express.Router();
const StudyMaterial = require('../models/StudyMaterial');

router.get('/', async (req, res) => {
  try {
    const { subject, topic, type, limit = 20 } = req.query;
    const query = {};
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;
    if (type) query.type = type;

    const materials = await StudyMaterial.find(query).sort({ createdAt: -1 }).limit(parseInt(limit));
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/subject/:subject', async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ subject: req.params.subject });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Not found' });
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;