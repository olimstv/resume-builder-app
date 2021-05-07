
// export async function getServerSideProps(context) {
import withSession, {extractReqResFromArgs, useUserServerSide} from "../util/session";
import {useRouter} from "next/router";
import {useState} from "react";
import {callApi} from "../util/api";
import {Button, Form, Header, Message, Segment} from "semantic-ui-react";
import Layout from "../components/Layout";

const Dashboard = ({ user }) => {
    const router = useRouter();

    const [slug, setSlug] = useState('');
    const [title, setTitle] = useState('');
    const [lastError, setLastError] = useState(undefined);

    const handleSlugChange = (e) => {
        setSlug(e.target.value);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        const {isSuccess, errorMessage, data} = await callApi('/create-resume', {slug, title});

        if (isSuccess) {
            router.push(`/resumes/edit/${data.newResumeId}`);
        } else {
            setLastError(errorMessage);
        }
    }

    return <Layout user={user}>
        <Header as='h2'>Create Resume</Header>

        <Form size='large' onSubmit={handleFormSubmit}>
            <Segment stacked>
                <Form.Field>
                    <label htmlFor="slug">Slug:</label>
                    <input name="slug" type="text" value={slug} onChange={handleSlugChange} tabIndex={1}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="title">Title:</label>
                    <input name="title" type="text" value={title} onChange={handleTitleChange}/>
                </Form.Field>

                {lastError && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{lastError}</p>
                    </Message>
                )}

                <Button type='submit'>Create</Button>
            </Segment>
        </Form>
    </Layout>
};

export const getServerSideProps = withSession(async function (...args) {

    const {req, res} = extractReqResFromArgs(args);
    const {isLoggedIn, user, httpResponse} = useUserServerSide(req);
    if (!isLoggedIn) {
        return httpResponse;
    }

    return { props: { user } };
});

export default Dashboard;
