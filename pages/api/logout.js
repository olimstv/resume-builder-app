import withSession, {useUserServerSide} from "../../util/session";

const apiLogout = withSession(async function (req,res) {

    const {isLoggedIn, user: alreadyLoggedInUser} = useUserServerSide(req);
    if (isLoggedIn) {
        req.session.destroy();
    }

    res.json({});
});

export default apiLogout;