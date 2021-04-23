const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

// Import User model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // If user doesn't exist, set User's Gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      // Create new user
      user = new User({
        name,
        email,
        avatar,
        password
      });
      // Encrypt password (using bcrypt):
      // - generate salt
      const salt = await bcrypt.genSalt(10);
      // - hash user's password
      user.password = await bcrypt.hash(password, salt);
      // sava user to DB
      await user.save();

      // Return jwt
      const payload = {
        user: {
          id: user.id
        }
      };
      // TODO: after deployment change 'expiresIn' to 3600
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;