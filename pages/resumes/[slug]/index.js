import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../../css/Resume.module.css';
import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import ResumeHeader from '../../../components/resume/ResumeHeader';
import About from '../../../components/resume/About';
import Awards from '../../../components/resume/Awards';
import Volunteer from '../../../components/resume/Volunteer';
import Contact from '../../../components/resume/Contact';
import Education from '../../../components/resume/Education';
import Skills from '../../../components/resume/Skills';
import Publications from '../../../components/resume/Publications';
import Languages from '../../../components/resume/Languages';
import Interests from '../../../components/resume/Interests';
import References from '../../../components/resume/References';
import { Grid } from 'semantic-ui-react';

// import '../../../css/bootstrap.min.css';
// import '../../../css/fontawesome.all.min.css';
// import './resumeStyles.css';

// Component
const PublicCvPage = ({ resume }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const { subprofile } = resume;
  const {
    basics,
    work,
    volunteer,
    education,
    awards,
    publications,
    skills,
    specific,
    languages,
    interests,
    references
  } = subprofile;
  return (
    <>
      <ResumeViewer />
      <ResumeHeader basics={basics} />
      <Grid>
        <Grid.Row>
          {/* LEFT COLUMN */}
          <Grid.Column computer={8} mobile={16}>
            <About subprofile={subprofile} />
            {/* <Awards /> */}
            {volunteer && <Volunteer subprofile={subprofile} />}
          </Grid.Column>

          {/* RIGHT COLUMN */}
          <Grid.Column computer={8} mobile={16}>
            <Contact basics={basics} />
            {education && <Education education={education} />}
            {skills && <Skills skills={skills} />}
            {/* <Publications /> */}
            <Languages languages={languages} />
            {interests && <Interests interests={interests} />}
            {references && <References references={references} />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

// SSR of each path
// export const getStaticPaths = async () => {
//   const user = {
//     _id: '608a8471dbb3c253e4d4e175',
//     firstName: 'test',
//     lastName: 'test',
//     email: 'oli@moli.com'
//   };
//   await dbConnect();

//   const data = await Resume.find({ user: user._id });

//   const paths = data.map(item => {
//     const resume = item.toObject();
//     resume._id = resume._id.toString();
//     resume.vacancy = resume.vacancy.toString();
//     resume.user = resume.user.toString();

//     return `/resumes/${resume.slug}`;
//   });

//   return {
//     paths,
//     fallback: false
//   };
// };

// getting static props from page
export async function getServerSideProps({ params }) {
  await dbConnect();

  const resume = await Resume.findOne({ slug: params.slug }).lean();
  resume._id = resume._id.toString();
  resume.vacancy = resume.vacancy.toString();
  resume.user = resume.user.toString();

  return { props: { resume } };
}

export default PublicCvPage;
