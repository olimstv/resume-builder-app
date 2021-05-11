import {
  Button,
  Header,
  Icon,
  Label, Segment, Tab
} from 'semantic-ui-react';
import {Fragment} from "react";


const About = ({
                 profile,
                 subprofile,
                 handleAddNameClick,
                 doSubprofileNamesMatch,
                 doSubprofileSummaryMatch,
                 handleAddAboutClick
               }) => {
  const {basics, work} = subprofile;
  return (

    <>
      <Fragment>
        <Button
          floated='right'
          size='mini'
          onClick={handleAddNameClick}
          color={doSubprofileNamesMatch ? 'teal' : null}
          icon={doSubprofileNamesMatch ? 'check' : 'add'}
        />
        <Header as='h2'>{profile.basics.name}</Header>
        <Label>{profile.basics.label}</Label>
      </Fragment>
      {/* ABOUT ME */
      }

      <Segment>
        <Button
          onClick={handleAddAboutClick}
          floated='right'
          color={doSubprofileSummaryMatch ? 'teal' : null}
          icon={doSubprofileSummaryMatch ? 'check' : 'add'}
          size='mini'
        />
        <Header as='h2'>
          <Icon name='user' size='small'/>
          About
        </Header>
        <Label ribbon>Summary</Label>
        {profile.basics.summary}
      </Segment>
    </>
  )
}


export default About;
