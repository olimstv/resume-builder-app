import withSession, {useUserServerSide} from "../../util/session";
import trim from 'lodash/trim';
import dbConnect from "../../util/dbConnect";
import Resume from "../../models/Resume";
import User from "../../models/User";

const apiCreateResume = withSession(async function (req, res) {

    try {

        const {isLoggedIn, user} = useUserServerSide(req);
        if (!isLoggedIn) {
            throw new Error('Unauthorized');
        }

        let {
            slug: slugInput,
            title: titleInput,
        } = await req.body;

        // Validate slug
        slugInput = trim(slugInput);
        if (!slugInput.length) {
            throw new Error('Please enter slug.');
        }
        if (slugInput.length > 100) {
            throw new Error('Resume slug is too long, expected no more than 100 symbols.');
        }
        // TODO: Validate that slug only containers chacacters that are good for URLs

        // Validate title
        titleInput = trim(titleInput);
        if (!titleInput.length) {
            throw new Error('Please enter title.');
        }
        if (titleInput.length > 1000) {
            throw new Error('Resume Title is too long, expected no more than 1000 symbols.');
        }

        await dbConnect();

        const dbUser = await User.findById(user._id);
        const currentUserProfile = dbUser.profile;

        const newResume = await Resume.create({
            slug: slugInput,
            title: titleInput,
            user: user._id,
            subprofile: currentUserProfile,
        });
        await newResume.save();
        const newResumeId = newResume._id.toString();

        
        res.json({newResumeId});

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

export default apiCreateResume;
