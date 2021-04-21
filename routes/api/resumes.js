const express = require('express');
const router = express.Router();

// @route   GET api/resumes
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Resumes route'));

module.exports = router;
