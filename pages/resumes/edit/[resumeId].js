import { Grid, Container, Header, Link, Button, Segment } from 'semantic-ui-react';
import ResumeViewer from '../../../components/ResumeViewer';
import ProfileSelector from '../../../components/ProfileSelector';
import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import User from '../../../models/User';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import withSession, {
  extractReqResFromArgs,
  useUserServerSide
} from '../../../util/session';

import safeJsonStringify from 'safe-json-stringify';
import moment from 'moment'

export default function EditResumePage(props) {
  const { profile, resume, user } = props;

  const [subprofile, setSubprofile] = useState(resume.subprofile);
  const [slug, setSlug] = useState(resume.slug);
  const [title, setTitle] = useState(resume.title);

  // TODO: Update Resume schema, add isPublished boolean flag,
  // and then use resume.isPublished as the initial state here.
  const [isPublished, setIsPublished] = useState(false);

  const handleClick = e => {};

  const handleOnSubprofileChange = newSubprofile => {
    setSubprofile(newSubprofile);
  };

  return (
      <Container fluid>
    <Layout user={user}>
        <Grid>
          <Grid.Row>
            {/* Profile Data View */}
            <Grid.Column computer={6} mobile={16}>
            <Header as='h2' block color='grey' textAlign='center'>
        {' '}
        Profile
      </Header>
              <ProfileSelector
                profile={profile}
                subprofile={subprofile}
                mode='selector'
                onSubprofileChange={handleOnSubprofileChange}
              />
            </Grid.Column>

            {/* Resume Preview */}
            <Grid.Column computer={10} mobile={12}>
              <Header as='h2' block color='grey' textAlign='center'>
                Resume Preview
              </Header>
              <ResumeViewer subprofile={subprofile} mode='editor' />
            </Grid.Column>
          </Grid.Row>
        </Grid>{' '}
        {/* TODO: Add components: 1) title, 2) slug, 3) isPublished checkbox; 3) Save button. The Save button will compose a new `resume` object with fields: slug, title, isPublished, subprofile, and  call an API to save it into the database (we do have its ID already!); and show a notice, e.g. "Saved successfully!". */}
        <Link >
              <Button color='teal' basic icon='save outline'>Save
            </Button>
          </Link>
    </Layout>
      </Container>
  );
}

export const getServerSideProps = withSession(async function (...args) {
  const { req, params } = extractReqResFromArgs(args);
  const { isLoggedIn, user: sessionUser, httpResponse } = useUserServerSide(
    req
  );
  if (!isLoggedIn) {
    return httpResponse;
  }

  await dbConnect();

  const resumeId = params.resumeId;

  const rawResume = await Resume.findById(resumeId).lean();
  // console.log('rawResume:', rawResume)
  const stringifiedResume = safeJsonStringify(rawResume)
  const resume = JSON.parse(stringifiedResume);
  // console.log('resume:', resume)
  

  if (!resume) {
    return { notFound: true };
  }

  // resume._id = resume._id.toString();
  
  // resume.user = resume.user.toString();
    

  const rawDbUser = await User.findById(resume.user); //.lean();
  // console.log('rawDbUser:', rawDbUser)
  const stringifiedDbUser = safeJsonStringify(rawDbUser)
  const dbUser = JSON.parse(stringifiedDbUser);
  // console.log('dbUser:', dbUser)
  
  if (!dbUser) {
    return { notFound: true };
  }
  // dbUser._id = dbUser._id.toString();
  const profile = dbUser.profile;

  // Prohibit access if the user currently authenticated
  if (dbUser._id !== sessionUser._id) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return { props: { resume, profile, user: sessionUser } };
});
