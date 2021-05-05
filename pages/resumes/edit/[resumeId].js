import { Grid, Container, Header, Divider, Segment } from 'semantic-ui-react';
import ResumeViewer from '../../../components/ResumeViewer';
import ProfileSelector from '../../../components/ProfileSelector';
import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import User from '../../../models/User';

export default function EditResumePage(props) {
  const { profile, resume, userId } = props;

  return (
    <Container fluid>
      <Grid>
        <Grid.Row>
          {/* Profile Data View */}
          <Grid.Column computer={6} mobile={16}>
            <ProfileSelector profile={profile} />
          </Grid.Column>

          {/* Resume Preview */}
          <Grid.Column computer={10} mobile={12}>
            <ResumeViewer subprofile={resume.subprofile} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      //{' '}
    </Container>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  // const user = userUser();

  const resumeId = params.resumeId;

  const resume = await Resume.findById(resumeId).lean();

  if (!resume) {
    return { notFound: true };
  }

  resume._id = resume._id.toString();
  resume.vacancy = resume.vacancy.toString();
  resume.user = resume.user.toString();

  const user = await User.findById(resume.user).lean();

  if (!user) {
    return { notFound: true };
  }
  user._id = user._id.toString();
  const profile = user.profile;

  //TODO: Prohibit access if the user currently authenticated
  // is not the same User ID.
  // Compare user._id with user.id

  return { props: { resume, profile, userId: user._id } };
}
