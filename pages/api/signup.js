import withSession, {useUserServerSide} from "../../util/session";
import dbConnect from "../../util/dbConnect";
import User from "../../models/User";
const bcrypt = require('bcryptjs');
import trim from 'lodash/trim';


const MIN_PASSWORD_LENGTH = 6;

const apiSignup = withSession(async function (req, res) {
    try {

        const {isLoggedIn} = useUserServerSide(req);
        if (isLoggedIn) {
            throw new Error('Please log out before registering a new account!');
        }

        let {
            email: emailInput,
            password: passwordInput,
            firstName: firstNameInput,
            lastName: lastNameInput,
        } = await req.body;

        // Validate First Name
        firstNameInput = trim(firstNameInput);
        if (!firstNameInput.length) {
            throw new Error('Please enter First Name.');
        }
        if (firstNameInput.length > 100) {
            throw new Error('First Name is too long, can be no longer than 100 characters.');
        }

        // Validate Last Name
        lastNameInput = trim(lastNameInput);
        if (!lastNameInput.length) {
            throw new Error('Please enter Last Name.');
        }
        if (lastNameInput.length > 100) {
            throw new Error('Last Name is too long, can be no longer than 100 characters.');
        }

        // Validate email
        emailInput = trim(emailInput);
        if (!emailInput) {
            throw new Error('Please enter email.');
        }
        if (emailInput.length > 1000) {
            throw new Error('Email is too long.');
        }
        if (emailInput.length < 3 || emailInput.indexOf('@') < 1) {
            throw new Error('Invalid email address');
        }

        // Validate password
        passwordInput = trim(passwordInput);
        if (!passwordInput) {
            throw new Error('Please enter password.');
        }
        if (passwordInput.length > 1000) {
            throw new Error('Password is too long.');
        }
        if (passwordInput.length < MIN_PASSWORD_LENGTH) {
            throw new Error(`Password is too short, must be at least ${MIN_PASSWORD_LENGTH} characters.`);
        }

        await dbConnect();

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(passwordInput, salt);
        const newUser = new User({
            email: emailInput,
            password: passwordHash,
            firstName: firstNameInput,
            lastName: lastNameInput,
            profile: {
                "basics": {
                    "name": firstNameInput + ' ' + lastNameInput,
                    "label": "",
                    "picture": "",
                    "email": emailInput,
                    "phone": "",
                    "website": "",
                    "summary": "",
                    "location": {
                        "address": "",
                        "postalCode": "",
                        "city": "",
                        "countryCode": "",
                        "region": ""
                    },
                    "profiles": []
                },
                "work": [],
                "volunteer": [],
                "education": [],
                "awards": [],
                "publications": [],
                "skills": [],
                "languages": [],
                "interests": [],
                "references": []
            }
        });

        await newUser.save();
        res.json({});

    } catch (error) {

        res.status(401).json({message: error.message})
    }
});

export default apiSignup;