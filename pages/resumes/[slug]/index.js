import { useState } from 'react';
import { useRouter } from 'next/router';
import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import ResumeViewer from '../../../components/ResumeViewer';
import {Container} from "semantic-ui-react";
import safeJsonStringify from 'safe-json-stringify';

// Component
const PublicCvPage = ({ resume }) => {

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
      <Container>
        <ResumeViewer subprofile={subprofile} mode='public' />
      </Container>
    </>
  );
};

// getting static props from page
export async function getServerSideProps({ params }) {
  await dbConnect();
  const rawDbResume = await Resume.findOne({ slug: params.slug }); //.lean();
  // console.log('rawDbUser:', rawDbUser)
  const stringifiedDbResume = safeJsonStringify(rawDbResume)
  const resume = JSON.parse(stringifiedDbResume);
  // console.log('dbUser:', dbUser)
  // const resume = await Resume.findOne({ slug: params.slug }).lean();
  // resume._id = resume._id.toString();
  
  // resume.user = resume.user.toString();

  return { props: { resume } };
}

export default PublicCvPage;
