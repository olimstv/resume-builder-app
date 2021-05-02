import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../css/Resume.module.css';
import dbConnect from '../../util/dbConnect';
import Resume from '../../models/Resume';
import ResumeHeader from '../../components/resume/ResumeHeader';
import About from '../../components/resume/About';
import Volunteer from '../../components/resume/Volunteer';
import Contact from '../../components/resume/Contact';
import Education from '../../components/resume/Education';
import Skills from '../../components/resume/Skills';
import Interests from '../../components/resume/Interests';
import References from '../../components/resume/Regerences';

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
  const {
    name,
    label,
    picture,
    email,
    phone,
    website,
    location,
    profiles,
    summary
  } = basics;
  const { address, postalCode, city, countryCode, region } = location;
  // let gitHubArr = profiles.filter(profile => {
  //   return profile.network === 'GitHub';
  // });
  // const gitHub = gitHubArr[0];

  // const { address, postalCode, city, countryCode, region } = location;

  // check
  // console.log('volunteer on parent :>> ', volunteer);
  return (
    <div className={styles.resume_body}>
      <div className={styles.container}>
        <ResumeHeader basics={basics} />
        <About subprofile={subprofile} />
        {volunteer && <Volunteer subprofile={subprofile} />}
        <Contact basics={basics} />
        <Education education={education} />
        <Skills skills={skills} />
        <Interests interests={interests} />
        {/* <References resume={resume} /> */}
      </div>
    </div>
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

    return `/resumes/${resume._id}`;
  });

  return {
    paths,
    fallback: false
  };
};

// getting static props from page
export async function getStaticProps({ params }) {
  await dbConnect();

  const resume = await Resume.findById(params.id).lean();
  resume._id = resume._id.toString();
  resume.vacancy = resume.vacancy.toString();
  resume.user = resume.user.toString();

  return { props: { resume } };
}

export default PublicCvPage;
