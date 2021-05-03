// import React from 'react'
import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import { Button, Checkbox, Form, Header } from 'semantic-ui-react';
import About from '../../../components/edit-resume/About';
import { Container } from 'semantic-ui-react';
import ResumeHeader from '../../../components/edit-resume/ResumeHeader';
import Volunteer from '../../../components/edit-resume/Volunteer';
import Contact from '../../../components/edit-resume/Contact';
import Education from '../../../components/edit-resume/Education';
import Skills from '../../../components/edit-resume/Skills';
import Publications from '../../../components/edit-resume/Publications';
import Languages from '../../../components/edit-resume/Languages';
import Interests from '../../../components/edit-resume/Interests';
import References from '../../../components/edit-resume/References';
import { useState } from 'react';

const ResumeEditForm = ({ resume }) => {
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

  // const [resume, setResume] = useState();

  return (
    <Container>
      <Header as='h1'>Edit Resume</Header>
      <Form>
        <ResumeHeader basics={basics} />
        <About subprofile={subprofile} />
        {/* <Awards /> */}
        {volunteer && <Volunteer subprofile={subprofile} />}
        {/* <Contact basics={basics} /> */}
        {/* {education && <Education education={education} />} */}
        {/* {skills && <Skills skills={skills} />} */}
        {/* <Publications /> */}
        {/* <Languages languages={languages} /> */}
        {/* {interests && <Interests interests={interests} />} */}
        {/* {references && <References references={references} />} */}
      </Form>
    </Container>
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

//     return `/resumes/edit/${resume.slug}`;
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

export default ResumeEditForm;
