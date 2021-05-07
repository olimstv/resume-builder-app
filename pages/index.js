import Layout from "../components/Layout";
import {Header} from "semantic-ui-react";
import withSession, {extractReqResFromArgs, useUserServerSide} from "../util/session";

export default function Home({user}) {
    return <Layout user={user}>
        <Header as='h2'>Let's Get IT</Header>

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            commodi, consequuntur distinctio, laboriosam quia, voluptates vitae
            facere repudiandae id autem eligendi quod vero nesciunt dolores quaerat
            enim! Suscipit, nesciunt expedita.
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            commodi, consequuntur distinctio, laboriosam quia, voluptates vitae
            facere repudiandae id autem eligendi quod vero nesciunt dolores quaerat
            enim! Suscipit, nesciunt expedita.
        </p>
    </Layout>
}


// export async function getServerSideProps(context) {
export const getServerSideProps = withSession(async function (...args) {

    //await dbConnect();

    const {req, res} = extractReqResFromArgs(args);
    const {isLoggedIn, user, httpResponse} = useUserServerSide(req);
    return { props: { user } };
});
