import { Grid, Container, Header, Divider, Segment } from 'semantic-ui-react';
import ResumeViewer from '../../../components/ResumeViewer';
import ProfileSelector from '../../../components/ProfileSelector';
import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import User from '../../../models/User';
import { useState } from 'react';

export default function EditResumePage(props) {
  const { profile, resume, userId } = props;

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
      <Grid>
        <Grid.Row>
          {/* Profile Data View */}
          <Grid.Column computer={6} mobile={16}>
            <ProfileSelector
              profile={profile}
              subprofile={subprofile}
              mode='selector'
              onSubprofileChange={handleOnSubprofileChange}
            />
          </Grid.Column>

          {/* Resume Preview */}
          <Grid.Column computer={10} mobile={12}>
            <ResumeViewer subprofile={subprofile} mode='editor' />
          </Grid.Column>
        </Grid.Row>
      </Grid>{' '}
      {/* TODO: Add components: 1) title, 2) slug, 3) isPublished checkbox; 3) Save button. The Save button will compose a new `resume` object with fields: slug, title, isPublished, subprofile, and  call an API to save it into the database (we do have its ID already!); and show a notice, e.g. "Saved successfully!". */}
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
