import Layout from "../components/Layout";
import {Header, Step, Icon, Container, Card, Segment} from "semantic-ui-react";
import withSession, {extractReqResFromArgs, useUserServerSide} from "../util/session";

export default function Home({user}) {
    return <Layout user={user}>

        <Container>
            
    



            <Step.Group vertical attached='top' >
                
        <Header as='h2'>Welcome to lets.get(IT)!</Header>
        <Header as='h5'>
            Compose multiple versions of your CV, each tuned individually for a particular role.</Header>
            <Step>
                <Icon name='signup' />
                <Step.Content>
                    <Step.Title>Profile</Step.Title>
                    <Step.Description>
                        Create a detailed version of your Profile.
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step>
                <Icon name='list' />
                <Step.Content>
                    <Step.Title>CVs</Step.Title>
                    <Step.Description>
                        Create unlimited individual CVs in a WYSIWYG editor.
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step>
                <Icon name='linkify' />
                <Step.Content>
                    <Step.Title>Public Links</Step.Title>
                    <Step.Description>
                        Assign a public link for each CV and share with employers.
                    </Step.Description>
                </Step.Content>
            </Step>
            <Step>
                <Icon name='file pdf' />
                <Step.Content>
                    <Step.Title>Download PDF</Step.Title>
                    <Step.Description>
                        Both you and employer can download the CV as a PDF.
                    </Step.Description>
                </Step.Content>
            </Step>
        </Step.Group>
        

        <p>
            We store your profile in Open Source <a href='https://jsonresume.org/' target='json_resume_open_source'>JSON Resume</a> format.
        </p>
        </Container>
    </Layout>
}


// export async function getServerSideProps(context) {
export const getServerSideProps = withSession(async function (...args) {

    //await dbConnect();

    const {req, res} = extractReqResFromArgs(args);
    const {isLoggedIn, user, httpResponse} = useUserServerSide(req);
    return { props: { user } };
});
