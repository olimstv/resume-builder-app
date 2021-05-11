import {Button, Divider, Header, Icon, Label, List, ListItem, Segment} from "semantic-ui-react";
import {Fragment} from "react";
import moment from "moment";


const Volunteer = ({
                     subprofile, profile,
                     handleAddVolunteerExperienceClick,
                     doSubprofileVolunteerMatch,
                     isVolunteerItemInSubprofile,
                     handleAddVolunteerInstanceClick
                   }) => {
// const {volunteer} = subprofile;
  return (<>
      {!profile.volunteer ? (
        <Label>Volunteer section doesn't filled yet...</Label>
      ) : (
        <Segment>
          <Button
            onClick={handleAddVolunteerExperienceClick}
            floated='right'
            color={doSubprofileVolunteerMatch ? 'teal' : null}
            icon={doSubprofileVolunteerMatch ? 'check' : 'add'}
            size='mini'
          />
          <Header as='h2'>
            <Icon name='users'/>
            Volunteer
          </Header>
          {profile.volunteer.map((exp, index) => {
            const isInSubprofile = isVolunteerItemInSubprofile(index);
            return (
              <Segment key={index}>
                <Button
                  onClick={handleAddVolunteerInstanceClick.bind(
                    this,
                    index
                  )}
                  floated='right'
                  color={isInSubprofile ? 'teal' : null}
                  icon={isInSubprofile ? 'check' : 'add'}
                  size='mini'
                />
                <Header as='h3'>{exp.organization}</Header>
                <Header.Subheader>
                  {moment(exp.startDate).format('DD-MM-YYYY')} - {!exp.endDate ? `till now` : moment(exp.endDate).format('DD-MM-YYYY')}
                </Header.Subheader>

                <div>
                  <Label ribbon>Role</Label>
                  {/* <Header as='h3'>{exp.position}</Header> */}
                  {exp.position}
                  <Divider hidden/>
                </div>

                <Fragment>
                  <Label ribbon>Summary</Label>
                  {exp.summary}
                </Fragment>

                <Header>Highlights</Header>
                {/* <Divider /> */}
                <List>
                  {exp.highlights.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Button
                          floated='right'
                          color={isInSubprofile ? 'teal' : null}
                          icon={isInSubprofile ? 'check' : 'add'}
                          size='mini'
                        />
                        <ListItem key={index}>
                          <List.Content>
                            <List.Icon name='check'/>
                            {item}
                          </List.Content>
                        </ListItem>
                        <Divider hidden/>
                      </Fragment>
                    );
                  })}
                </List>
              </Segment>
            );
          })}
        </Segment>
      )}</>
  );
}

export default Volunteer;
