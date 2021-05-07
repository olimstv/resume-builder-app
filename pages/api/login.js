import withSession, {useUserServerSide} from "../../util/session";
import dbConnect from "../../util/dbConnect";
import Resume from "../../models/Resume";
import User from "../../models/User";
const bcrypt = require('bcryptjs');

const apiLogin = withSession(async function (req, res) {

    const {isLoggedIn, user: alreadyLoggedInUser} = useUserServerSide(req);
    if (isLoggedIn) {
        res.json(alreadyLoggedInUser);
        return;
    }

    try {
        const invalidCredentialsMessage = 'Invalid email and password credentials.';

        const { email: emailInput, password: passwordInput } = await req.body;

        // Validate email
        if (!emailInput) {
            throw new Error('Please enter email.');
        }
        if (emailInput.length > 1000) {
            throw new Error('Email is too long.');
        }

        // Validate password
        if (!passwordInput) {
            throw new Error('Please enter password.');
        }
        if (passwordInput.length > 1000) {
            throw new Error('Password is too long.');
        }

        await dbConnect();

        const userInDb = await User.findOne({ email: emailInput });
        if (!userInDb) {
            throw new Error(invalidCredentialsMessage);
        }

        const isPasswordCorrect = await bcrypt.compare(passwordInput, userInDb.password);
        if (!isPasswordCorrect) {
            throw new Error(invalidCredentialsMessage);
        }

        const sessionUser = {
            _id: userInDb._id.toString(),
            firstName: userInDb.firstName,
            lastName: userInDb.lastName,
            email: userInDb.email,
        };
        req.session.set('user', sessionUser);
        await req.session.save();
        res.json(sessionUser);

    } catch (error) {
        res.status(401).json({message: error.message})
    }
});

export default apiLogin;