import * as T from 'prop-types';
import { Container, Header } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import dbConnect from '../../../util/dbConnect';
// import Resume from '../../../models/Resume';
import ResumeHeader from '../components/resume/ResumeHeader';
import About from '../components/resume/About';
import Awards from '../components/resume/Awards';
import Volunteer from '../components/resume/Volunteer';
import Contact from '../components/resume/Contact';
import Education from '../components/resume/Education';
import Skills from '../components/resume/Skills';
import Publications from '../components/resume/Publications';
import Languages from '../components/resume/Languages';
import Interests from '../components/resume/Interests';
import References from '../components/resume/References';
import { Grid, Segment, Button } from 'semantic-ui-react';
// import ResumeViewer from '../../../components/ResumeViewer';

export default function ResumeViewer(props) {
  const { subprofile, mode = 'public' } = props;

  return (
    <>
      <Segment raised={mode === 'editor'}>
        <ResumeHeader basics={subprofile.basics} />
        <Grid>
          <Grid.Row>
            {/* LEFT COLUMN */}
            <Grid.Column computer={8} mobile={16}>
              <About subprofile={subprofile} />
              {/* <Awards /> */}
              {subprofile.volunteer && <Volunteer subprofile={subprofile} />}
            </Grid.Column>

            {/* RIGHT COLUMN */}
            <Grid.Column computer={8} mobile={16}>
              <Contact basics={subprofile.basics} />
              {subprofile.education && (
                <Education education={subprofile.education} />
              )}
              {subprofile.skills && <Skills skills={subprofile.skills} />}
              {/* <Publications /> */}
              <Languages languages={subprofile.languages} />
              {subprofile.interests && (
                <Interests interests={subprofile.interests} />
              )}
              {subprofile.references && (
                <References references={subprofile.references} />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      
     
         
              
    </>
  );
}
ResumeViewer.propTypes = {
  mode: T.oneOf(['editor', 'public'])
};
