import {Button, Divider, Header, Icon, Label, List, ListItem, Segment, Tab} from "semantic-ui-react";
import moment from "moment";
import {Fragment} from "react";


const Work = ({
                profile,
                handleAddAllWorkExperienceClick,
                doWorkMatch,
                //TODO: change handle to on...
                handleAddWorkExperienceInstanceClick,
                isWorkItemInSubprofile
              }) => {

  return (
    <>

      <Button
        onClick={handleAddAllWorkExperienceClick}
        floated='right'
        color={doWorkMatch ? 'teal' : null}
        icon={doWorkMatch ? 'check' : 'add'}
        size='mini'
      />{' '}
      <Header as='h2'>
        <Icon name='suitcase'/>
        Work Experience </Header>
      {/* <Divider /> */}
      {profile.work.map((exp, index) => {
        const isInSubprofile = isWorkItemInSubprofile(index);
        return (
          <Segment key={index}>
            <Button
              onClick={handleAddWorkExperienceInstanceClick.bind(
                this,
                index
              )}
              floated='right'
              color={isInSubprofile ? 'teal' : null}
              icon={isInSubprofile ? 'check' : 'add'}
              size='mini'
            />
            <Header as='h3'>{exp.company}</Header>
            <Header.Subheader>
              {moment(exp.startDate).format('DD-MM-YYYY')} - {!exp.endDate ? `till now` : moment(exp.endDate).format('DD-MM-YYYY')}
            </Header.Subheader>
            <Fragment>
              <Divider hidden/>
              <Label ribbon>Role</Label>
              {exp.position}
            </Fragment>
            <Fragment>
              <Divider hidden/>
              <Label ribbon>Summary</Label>
              {exp.summary}
            </Fragment>
            <Fragment>
              {/* <Button  floated='right' icon='add' size='mini' /> */}
              {/* <Divider /> */}
              <Header>Highlights</Header>
              <List>
                {exp.highlights &&
                exp.highlights.map((item, index) => {
                  // const isInSubprofile = doSubprofileWorkMatch;
                  return (
                    <Fragment key={index}>
                      <Button
                        floated='right'
                        color={isInSubprofile ? 'teal' : null}
                        icon={isInSubprofile ? 'check' : 'add'}
                        size='mini'
                      ></Button>
                      <ListItem key={index}>
                        <List.Icon name='check'/>
                        <List.Content
                          key={index}
                          className='list-group-item'
                        >
                          {item}
                        </List.Content>
                      </ListItem>
                    </Fragment>
                  );
                })}
              </List>
            </Fragment>
          </Segment>
        );
      })}

    </>
  )
}

export default Work;




