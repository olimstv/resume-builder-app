const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Objective = require('../../models/Objective');
const User = require('../../models/User');

// @route   GET api/objectives
// @desc    Get all objectives
// @access  Private
router.get('/', auth, async (req, res) => {
  const objectives = await Objective.find({
    // content: req.body.content,
    user: req.user.id
  }).populate('user', 'name');
  console.log('objectives: ', objectives);
  try {
    if (objectives.length === 0) {
      return res
        .status(404)
        .json({ msg: 'There are no objectives created by this user' });
    }
    res.json(objectives);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/objectives
// @desc    Create an objective
// @access  Public
router.post(
  '/',
  [auth, [check('content', 'Objective is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let objective = await Objective.findOne({
        user: req.user.id,
        content: req.body.content
      }).populate('user', ['name', 'avatar']);
      // console.log('objective :>> ', objective);
      if (objective) {
        console.log('objective from db:>> ', objective);
        return res.json(objective);
      }
      // create
      objective = new Objective({
        content: req.body.content,
        user: req.user.id
      });
      await objective.save();
      res.status(201).json(objective);
      console.log('new objective created:>> ', objective);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// // @route   PUT api/objectives
// // @desc    Update an objective
// // @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let objective = await Objective.findById(req.params.id);

    if (!objective) {
      return res
        .status(404)
        .json({ msg: `Objective with id: "${req.params.id}" not found` });
    }
    // const updatedObjective = {}
    // updatedObjective.id = req.params.id;
    // updatedObjective.content = req.params.content;
    objective = await Objective.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.status(204).json(objective);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // @route   DELETE api/objectives
// // @desc    Delete an objective
// // @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let objective = await Objective.findById(req.params.id);

    if (!objective) {
      return res
        .status(404)
        .json({ msg: `Objective with id: "${req.params.id}" not found` });
    }
    await objective.remove();
    res.status(204).json({ msg: 'Objective deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
