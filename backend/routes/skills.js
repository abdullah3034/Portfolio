const express = require('express');
const { body, validationResult } = require('express-validator');
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    
    const skills = await Skill.find(query).sort({ order: 1, createdAt: -1 });
    res.json(skills);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/skills/categories
// @desc    Get skill categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Skill.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get skill categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/skills
// @desc    Create new skill
// @access  Private
router.post('/', auth, [
  body('name').trim().isLength({ min: 1, max: 50 }),
  body('category').isIn(['languages', 'frontend', 'backend', 'databases', 'tools', 'languages_spoken']),
  body('level').isInt({ min: 0, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skill = new Skill(req.body);
    await skill.save();

    res.status(201).json(skill);
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private
router.put('/:id', auth, [
  body('name').optional().trim().isLength({ min: 1, max: 50 }),
  body('category').optional().isIn(['languages', 'frontend', 'backend', 'databases', 'tools', 'languages_spoken']),
  body('level').optional().isInt({ min: 0, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(skill);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

