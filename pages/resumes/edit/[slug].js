// import React from 'react'
import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import { Button, Checkbox, Form, Header } from 'semantic-ui-react';
import About from '../../../components/edit-resume/About';
import { Container } from 'semantic-ui-react';
import ResumeHeader from '../../../components/edit-resume/ResumeHeader';

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

  return (
    <Container>
      <Header as='h1'>Edit Resume</Header>
      <Form>
        <ResumeHeader basics={basics} />
        <About subprofile={subprofile} />
      </Form>
    </Container>
  );
};

// SSR of each path
export const getStaticPaths = async () => {
  const user = {
    _id: '608a8471dbb3c253e4d4e175',
    firstName: 'test',
    lastName: 'test',
    email: 'oli@moli.com'
  };
  await dbConnect();

  const data = await Resume.find({ user: user._id });

  const paths = data.map(item => {
    const resume = item.toObject();
    resume._id = resume._id.toString();
    resume.vacancy = resume.vacancy.toString();
    resume.user = resume.user.toString();

    return `/resumes/edit/${resume.slug}`;
  });

  return {
    paths,
    fallback: false
  };
};

// getting static props from page
export async function getStaticProps({ params }) {
  await dbConnect();

  const resume = await Resume.findOne({ slug: params.slug }).lean();
  resume._id = resume._id.toString();
  resume.vacancy = resume.vacancy.toString();
  resume.user = resume.user.toString();

  return { props: { resume } };
}

export default ResumeEditForm;
