import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../util/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
      break;

    // @route   POST api/users
    // @desc    Register User
    // @access  Public
    case 'POST':
      try {
        const { firstName, lastName, email, password } = req.body;
        let user = await User.findOne({ email });
        // Check if user exists in DB
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
        // If user doesn't exist, create new user
        user = new User({
          firstName,
          lastName,
          email,
          password
        });

        // Encrypt password (using bcrypt)
        // - generate salt
        const salt = await bcrypt.genSalt(10);
        // - hash user's password
        user.password = await bcrypt.hash(password, salt);
        // - save user to DB
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
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.json('Server Error');
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
