import moment from 'moment'
import {Button, Header, Icon, List, ListItem, Segment, Tab} from "semantic-ui-react";

const Education = ({
                     profile, handleAddEducationClick,
                     doSubprofileEducationMatch,
                     isEducationItemInSubprofile,
                     handleAddEducationInstanceClick
                   }) => {
  // console.log('education :>> ', education);
  return (
    <>
      <Button
        onClick={handleAddEducationClick}
        floated='right'
        color={doSubprofileEducationMatch ? 'teal' : null}
        icon={doSubprofileEducationMatch ? 'check' : 'add'}
        size='mini'
      />
      <Header as='h2'>
        <Icon name='university'/> Education
      </Header>

      {profile.education.map((exp, index) => {
        const isInSubprofile = isEducationItemInSubprofile(index); //TODO: FIX ICON
        console.log('isInSubprofile :>> ', isInSubprofile);
        return (
          <Segment key={index}>
            <Button
              onClick={handleAddEducationInstanceClick.bind(this, index)}
              color={isInSubprofile ? 'teal' : null}
              icon={isInSubprofile ? 'check' : 'add'}
              floated='right'
              size='mini'
            />
            <Header as='h3'>{exp.institution}</Header>
            <Header.Subheader>
              {moment(exp.startDate).format('DD-MM-YYYY')} - {!exp.endDate ? `till now` : moment(exp.endDate).format('DD-MM-YYYY')}
            </Header.Subheader>

            <div>
              <Header as='h4'>{exp.Area}</Header>
              <Header.Subheader>{exp.studyType}</Header.Subheader>

              {exp.courses &&
              exp.courses.map((course, index) => {
                return (
                  <ListItem key={index}>
                    <List.Content>
                      {' '}
                      <List.Icon name='book'/>
                      {course}
                    </List.Content>
                  </ListItem>
                );
              })}
            </div>
          </Segment>
        );
      })}
    </>


  );
};

export default Education;
