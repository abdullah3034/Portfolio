const express = require('express');
const { body, validationResult } = require('express-validator');
const Education = require('../models/Education');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/education
// @desc    Get all education records
// @access  Public
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, startDate: -1 });
    res.json(education);
  } catch (error) {
    console.error('Get education error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/education
// @desc    Create new education record
// @access  Private
router.post('/', auth, [
  body('institution').trim().isLength({ min: 1, max: 200 }),
  body('degree').trim().isLength({ min: 1, max: 200 }),
  body('startDate').isISO8601(),
  body('endDate').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const education = new Education(req.body);
    await education.save();

    res.status(201).json(education);
  } catch (error) {
    console.error('Create education error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/education/:id
// @desc    Update education record
// @access  Private
router.put('/:id', auth, [
  body('institution').optional().trim().isLength({ min: 1, max: 200 }),
  body('degree').optional().trim().isLength({ min: 1, max: 200 }),
  body('startDate').optional().isISO8601(),
  body('endDate').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }

    res.json(education);
  } catch (error) {
    console.error('Update education error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/education/:id
// @desc    Delete education record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }

    res.json({ message: 'Education record deleted successfully' });
  } catch (error) {
    console.error('Delete education error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

