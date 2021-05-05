import {
  Container,
  Divider,
  Header,
  HeaderContent,
  Icon,
  Label,
  List,
  ListItem,
  Segment,
  Link,
  Button,
  Reveal,
  IconGroup
} from 'semantic-ui-react';

import * as T from 'prop-types';
import { default as lodashSet } from 'lodash/set';
import { Fragment } from 'react';

export default function ProfileSelector(props) {
  const { profile, subprofile, onSubprofileChange, mode = 'editor' } = props;

  const isEditor = mode === 'editor';
  const isSelector = mode === 'selector';

  const isNetworkProfileFoundInSubprofile = networkName => {
    const profiles = subprofile?.basics?.profiles;
    if (!profiles) {
      return false;
    }
    const numProfiles = profiles.length;
    for (let i = 0; i < numProfiles; i++) {
      if (profiles[i].network === networkName) {
        return true;
      }
    }
    return false;
  };

  const doSubprofileNamesMatch =
    profile?.basics?.name === subprofile?.basics?.name;

  const callOnSubprofileChange = newSubprofileObject => {
    if (onSubprofileChange) {
      onSubprofileChange(newSubprofileObject);
    }
  };

  const handleAddNameClick = () => {
    const newSubprofile = { ...subprofile };
    lodashSet(newSubprofile, 'basics.name', profile.basics.name);
    lodashSet(newSubprofile, 'basics.label', profile.basics.label);
    callOnSubprofileChange(newSubprofile);
  };

  const ProfileSegment = props => {
    const { network, username, url } = props.networkProfile;

    const isFoundInSubprofile = isNetworkProfileFoundInSubprofile(network);
    let iconName;
    if (network === 'LinkedIn') {
      iconName = 'linkedin';
    } else if (network === 'gitHub') {
      iconName = 'github';
    }

    return (
      <Segment padded>
        {isEditor && <Button icon='edit' floated='right' />}
        {isSelector && (
          <Button
            positive
            icon={isFoundInSubprofile ? 'check' : 'add'}
            floated='right'
          />
        )}

        {iconName && <Icon name={iconName} />}

        <a href={url} target={network}>
          {username}
        </a>
      </Segment>
    );
  };

  return (
    <div>
      <Header as='h2' block color='grey' textAlign='center'>
        {' '}
        Profile
      </Header>

      <Segment>
        {/* <Button basic floated='right' icon='add'></Button> */}
        <Button.Group floated='right'>
          <Button icon='edit'></Button>
          <Button.Or />
          <Button
            onClick={handleAddNameClick}
            positive
            icon={doSubprofileNamesMatch ? 'check' : 'add'}
          />
        </Button.Group>
        <div>
          <Header as='h2'>{profile.basics.name}</Header>
          <Label>
            <Icon name='code'></Icon> {profile.basics.label}
          </Label>
        </div>
      </Segment>

      {/* ABOUT ME */}
      <Segment>
        {/* <Button basic floated='right' icon='add'></Button>
         */}
        <Button.Group floated='right'>
          <Button icon='edit'></Button>
          <Button.Or />
          <Button positive icon='add'></Button>
        </Button.Group>
        <div>
          <Header as='h2' dividing>
            <Icon name='user' size='small' />
            About
          </Header>
        </div>
        <Segment>
          <Button basic floated='right' icon='add'></Button>

          <Label ribbon='left'>Summary</Label>

          <span>{profile.basics.summary}</span>
        </Segment>
      </Segment>

      {/* <!-- WORK EXPERIENCE --> */}
      {!profile.work ? (
        <Label>Work Experience section doesn't filled yet...</Label>
      ) : (
        <Segment>
          <Button.Group floated='right'>
            <Button icon='edit'></Button>
            <Button.Or />
            <Button positive icon='add'></Button>
          </Button.Group>

          <Header as='h2' dividing>
            <Icon name='suitcase' />
            Work Experience
          </Header>

          {profile.work.map((exp, index) => {
            return (
              <Segment key={index}>
                {/* <Button basic floated='right' icon='add'></Button> */}
                <Button.Group floated='right'>
                  <Button icon='edit'></Button>
                  <Button.Or />
                  <Button positive icon='add'></Button>
                </Button.Group>
                <Header as='h3'>{exp.company}</Header>
                <Header.Subheader>
                  {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
                </Header.Subheader>

                <Segment>
                  <Label ribbon='left'>Role</Label>
                  <span>{exp.position}</span>
                </Segment>
                <Segment>
                  <Label ribbon='left'>Summary</Label>
                  <span>{exp.summary}</span>
                </Segment>
                <Segment>
                  {/* <Button basic floated='right' icon='add'></Button> */}
                  <Header>Highlights</Header>
                  <List>
                    {exp.highlights &&
                      exp.highlights.map((item, index) => {
                        return (
                          <Segment key={index}>
                            {/* <Button basic floated='right' icon='add'></Button> */}
                            <Button.Group floated='right'>
                              <Button icon='edit'></Button>
                              <Button.Or />
                              <Button positive icon='add'></Button>
                            </Button.Group>
                            <ListItem key={index}>
                              <List.Icon name='check' />
                              <List.Content
                                key={index}
                                className='list-group-item'
                              >
                                {item}
                              </List.Content>
                            </ListItem>
                          </Segment>
                        );
                      })}
                  </List>
                </Segment>
              </Segment>
            );
          })}
        </Segment>
      )}
      {/* <!-- VOLUNTEER --> */}

      {!profile.volunteer ? (
        <Label>Volunteer section doesn't filled yet...</Label>
      ) : (
        <Segment>
          <Button.Group floated='right'>
            <Button icon='edit'></Button>
            <Button.Or />
            <Button positive icon='add'></Button>
          </Button.Group>
          <Header as='h2' dividing>
            <Icon name='users' />
            Volunteer
          </Header>
          {profile.volunteer.map((exp, index) => {
            return (
              <Segment key={index}>
                <Button.Group floated='right'>
                  <Button icon='edit'></Button>
                  <Button.Or />
                  <Button positive icon='add'></Button>
                </Button.Group>
                <Header as='h3'>{exp.organization}</Header>
                <Header.Subheader>
                  {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
                </Header.Subheader>

                <Segment>
                  <Label ribbon>Role</Label>
                  {/* <Header as='h3'>{exp.position}</Header> */}
                  <span>{exp.position}</span>
                </Segment>

                <Segment>
                  <Label ribbon='left'>Summary</Label>
                  {exp.summary}
                </Segment>

                <Header>Highlights</Header>
                <List>
                  {exp.highlights.map((item, index) => {
                    return (
                      <Segment key={index}>
                        <Button.Group floated='right'>
                          <Button icon='edit'></Button>
                          <Button.Or />
                          <Button positive icon='add'></Button>
                        </Button.Group>
                        <ListItem key={index}>
                          <List.Content>
                            <List.Icon name='check' />
                            {item}
                          </List.Content>
                        </ListItem>
                      </Segment>
                    );
                  })}
                </List>
              </Segment>
            );
          })}
        </Segment>
      )}
      {/* <!-- CONTACT --> */}

      <Segment>
        <Button.Group floated='right'>
          <Button icon='edit'></Button>
          <Button.Or />
          <Button positive icon='add'></Button>
        </Button.Group>
        <Header dividing as='h2'>
          <Icon name='bullseye' /> Contact
        </Header>
        <Segment padded>
          <Button.Group floated='right'>
            <Button icon='edit'></Button>
            <Button.Or />
            <Button positive icon='add'></Button>
          </Button.Group>
          <Icon name='location arrow' />
          {profile.basics.location.city}, {profile.basics.location.region}{' '}
          {profile.basics.location.countryCode}
        </Segment>
        <Segment padded>
          <Button.Group floated='right'>
            <Button icon='edit'></Button>
            <Button.Or />
            <Button positive icon='add'></Button>
          </Button.Group>
          <Icon name='phone' />
          {profile.basics.phone}
        </Segment>
        <Segment padded>
          <Button.Group floated='right'>
            <Button icon='edit'></Button>
            <Button.Or />
            <Button positive icon='add'></Button>
          </Button.Group>
          <Icon name='mail' />
          {/* <a href={`mailto:${profile.basics.email}`}>{profile.basics.email}</a> */}
          <a href={`mailto:{profile.basics.email}`} target='_blank'>
            {profile.basics.email}
          </a>
        </Segment>
        {profile.basics.profiles.map((networkProfile, ind) => {
          return <ProfileSegment key={ind} networkProfile={networkProfile} />;
        })}
      </Segment>

      {/* <!-- EDUCATION --> */}

      <Segment>
        <Button basic floated='right' icon='add'></Button>
        <Header dividing as='h2'>
          <Icon name='university' /> Education
        </Header>

        {profile.education.map((exp, index) => {
          return (
            <Segment key={index}>
              <Button basic floated='right' icon='add'></Button>
              <Header as='h3'>{exp.institution}</Header>
              <Header.Subheader>
                {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
              </Header.Subheader>

              <div className='description pull-right'>
                <Header as='h4'>{exp.Area}</Header>
                <Header.Subheader>{exp.studyType}</Header.Subheader>

                {exp.courses &&
                  exp.courses.map((course, index) => {
                    return (
                      <ListItem key={index}>
                        <List.Content>
                          {' '}
                          <List.Icon name='book' />
                          {course}
                        </List.Content>
                      </ListItem>
                    );
                  })}
              </div>
            </Segment>
          );
        })}
      </Segment>

      {/* <!-- SKILLS --> */}

      <Segment>
        <Button basic floated='right' icon='add'></Button>
        <Header dividing as='h2'>
          <Icon name='tasks' /> Skills
        </Header>

        <Segment>
          {profile.skills.map((skill, index) => {
            return (
              <div key={index}>
                <Header as='h3'>{skill.name}</Header>
                <Header.Subheader>{skill.level}</Header.Subheader>
                <Divider hidden />
                {skill.keywords && (
                  <Fragment>
                    <Label ribbon='left'>Tools &#38; Technologies</Label>

                    <Label.Group circular>
                      <Divider hidden fitted />
                      {skill.keywords.map((word, index) => {
                        return (
                          <Label as='a' key={index}>
                            <Icon corner='right' name='add' />
                            {word}
                          </Label>
                        );
                      })}
                    </Label.Group>
                  </Fragment>
                )}
              </div>
            );
          })}
        </Segment>
      </Segment>

      <div className='box'>
        <h2>
          <i className='fas fa-tasks ico'></i> Skills
        </h2>
        <div className='skills clearfix'>
          <div className='item-skills'>
            Web Development
            <span className='skill-level'>Junior</span>
          </div>
          <div className='col-sm-offset-1 col-sm-12 clearfix'>
            <span className='skill badge'>HTML</span>
          </div>
        </div>
      </div>
      {/* <!-- HOBBIES --> */}
      <div className='box'>
        <h2>
          <i className='fas fa-heart ico'></i> Interests
        </h2>
        <div className='interests clearfix'>
          <div className='item-interests'>Music</div>
          <div className='col-sm-offset-1 col-sm-12 clearfix'>
            <span className='interest badge'>Professional musician</span>
            <span className='interest badge'>Drummer</span>
            <span className='interest badge'>Drumming teacher</span>
            <span className='interest badge'>
              Sound engineering and video production
            </span>
          </div>
        </div>
      </div>
      <div className='box'>
        <h2>
          <i className='fas fa-check-square ico'></i> References
        </h2>
        <blockquote>
          <div>Reference...</div>
          <footer>
            <a href='' target='_blank'>
              Oleksandr Bilyk
            </a>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

ProfileSelector.propTypes = {
  onSubprofileChange: T.func,
  subprofile: T.object.isRequired,
  profile: T.object.isRequired,
  mode: T.oneOf(['selector', 'editor'])
};
