import dbConnect from '../../../util/dbConnect';
import Resume from '../../../models/Resume';
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Header,
  ButtonGroup
} from 'semantic-ui-react';
import About from '../../../components/edit-resume/About';
import {Container} from 'semantic-ui-react';
import ResumeHeader from '../../../components/edit-resume/ResumeHeader';
import Volunteer from '../../../components/edit-resume/Volunteer';
import Contact from '../../../components/edit-resume/Contact';
import Education from '../../../components/edit-resume/Education';
import Skills from '../../../components/edit-resume/Skills';
import Publications from '../../../components/edit-resume/Publications';
import Languages from '../../../components/edit-resume/Languages';
import Interests from '../../../components/edit-resume/Interests';
import Other from '../../../components/edit-resume/Other';
import {useEffect, useState, useRef} from 'react';
import {default as lodashSet} from 'lodash/set';
// import { useState, useEffect } from 'react';
// import useSWR from 'swr';
// import { useRouter } from 'next/router';

const ResumeEditForm = ({resume: loadedResume}) => {
  const inputRef = useRef();

  function focus() {
    inputRef.current.focus();
  }

  const [resumeData, setResumeData] = useState(loadedResume);

  // const [resumeData, setResumeData] = useState({
  //   _id: resume._id,
  //   user: resume.user,
  //   vacancy: resume.vacancy,
  //   slug: resume.slug,
  //   title: resume.title,
  //   subprofile: resume.subprofile
  // });
  const {subprofile} = resumeData;
  console.log('subprofile :>> ', subprofile);
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
  } = resumeData.subprofile;
  console.log('basics :>> ', basics);
  const {
    name,
    label,
    picture,
    email,
    phone,
    website,
    summary,
    location
  } = resumeData.subprofile.basics;
  console.log('name :>> ', name);

  const handleChangeByPath = (path, e) => {
    if (!resumeData) {
      console.log(
        `Skipped updating resume data at path ${path} because the resume data is a falsy value.`
      );
      return;
    }

    const newValue = e.target.value;
    console.log(`Setting a new value for path "${path}: ${newValue}"`);

    const newResumeData = {...resumeData};
    lodashSet(newResumeData, path, newValue);

    setResumeData(newResumeData);
    console.log('newResumeData :>> ', newResumeData);
  };
  // const handleSubmit = target => {
  //   e.preventDefault();
  //   setResumeData({ ...resume, [target.name]: target.value });
  // };

  return (
    <Container>
      <Header as='h1'>Edit Resume</Header>
      <Form>
        {/* <ResumeHeader basics={basics} /> */}
        <Container fluid>
          <Header color='blue' as='h2'>
            Resume Header
          </Header>

          <input
            // error={{ content: 'Please enter your first name', pointing: 'below' }}
            ref={inputRef}
            onChange={handleChangeByPath.bind(null, 'subprofile.basics.name')}
            value={resumeData.subprofile.basics.name}
            label='Full Name'
            // name='name'
            placeholder='Full Name'
            id='form-input-first-name'
          />
          <ButtonGroup floated='right'>
            <Button onClick={focus} primary icon>
              <Icon name='edit'/>
            </Button>
            <Button icon>
              <Icon name='save'/>
            </Button>
          </ButtonGroup>
          <input
            // error='Please enter your last name'
            value={resumeData.subprofile.basics.label}
            onChange={handleChangeByPath.bind(null, 'subprofile.basics.label')}
            label='Role'
            placeholder='Role'
          />
          <ButtonGroup floated='right'>
            <Button onClick={focus} primary icon>
              <Icon name='edit'/>
            </Button>
            <Button icon>
              <Icon name='save'/>
            </Button>
          </ButtonGroup>
        </Container>
        <About subprofile={subprofile}/>
        {/* <Awards /> */}
        {/* {volunteer && <Volunteer subprofile={subprofile} />} */}
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

export async function getServerSideProps({params}) {
  await dbConnect();

  const resume = await Resume.findOne({slug: params.slug}).lean();
  resume._id = resume._id.toString();

  resume.user = resume.user.toString();

  return {props: {resume}};
}

export default ResumeEditForm;
