import withSession, {useUserServerSide} from "../../util/session";
import dbConnect from "../../util/dbConnect";
import User from "../../models/User";

const apiSaveProfileJson = withSession(async function (req, res) {
    try {

        const {isLoggedIn, user: sessionUser} = useUserServerSide(req);
        if (!isLoggedIn) {
            throw new Error('Unauthorized');
        }

        let {profileJsonObj} = await req.body;

        // Validate new profile JSON
        if (!profileJsonObj || profileJsonObj === [] || profileJsonObj === {}) {
            throw new Error('Profile should not be empty.');
        }
        // TODO: Validate the new profile object against the schema.
        // We can use Mongoose validate() method:
        // https://mongoosejs.com/docs/api/model.html#model_Model.validate

        await dbConnect();

        // Retrieve currently logged in user from database
        const user = await User.findById(sessionUser._id);

        // Update user profile
        user.profile = profileJsonObj;

        // Save the user (will only save the updated fields, so it is still efficient)
        await user.save()

        res.json({});

    } catch (error) {
        res.status(401).json({message: error.message})
    }
})

export default apiSaveProfileJson;
