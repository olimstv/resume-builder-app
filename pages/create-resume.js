
// export async function getServerSideProps(context) {
import withSession, {extractReqResFromArgs, useUserServerSide} from "../util/session";
import {useRouter} from "next/router";
import {useState} from "react";
import {callApi} from "../util/api";
import {Button, Container, Form, Header, Message, Segment} from "semantic-ui-react";
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

        <Container  className='create-resume-form' >
   <Form.Group widths='four eight four'>
        <Form size='large' onSubmit={handleFormSubmit}>
                <Segment stacked>
        <Header as='h2' color='teal' textAlign='center'>Create Resume</Header>
                <Form.Field>
                    {/* <label htmlFor="slug">Slug:</label> */}
                    <Form.Input   fluid
                  icon='paper plane outline'
                  iconPosition='left'
                  placeholder='Enter a slug for the resume'
                  
                   name="slug" type="text" value={slug} onChange={handleSlugChange} tabIndex={1}/>
                </Form.Field>
                <Form.Field>
                    {/* <label htmlFor="title">Title:</label> */}
                    <Form.Input placeholder='Enter a title fo the resume' icon='quote right' iconPosition='left' className='submit-button' name="title" type="text" value={title} onChange={handleTitleChange}/>
                </Form.Field>

                {lastError && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{lastError}</p>
                    </Message>
                )}

                <Button color='teal' size='large' fluid type='submit'>Create</Button>
            </Segment>
            </Form>
            </Form.Group>
            </Container>
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
