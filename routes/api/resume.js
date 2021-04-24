const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

// @route   GET api/resumes
// @desc    Test Route
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
  }
});

// @route   POST api/resumes
// @desc    Test Route
// @access  Private
router.post('/', auth, (req, res) => {
  const {
    vacancy,
    basics,
    work,
    education,
    awards,
    publications,
    skills,
    languages,
    interests
  } = req.body;

  // Resume object
});

module.exports = router;
