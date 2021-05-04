import {
  Container,
  Divider,
  Header,
  HeaderContent,
  Icon,
  Label,
  List,
  ListItem,
  Segment
} from 'semantic-ui-react';
export default function ProfileSelector(props) {
  const { profile } = props;

  return (
    <Container>
      <Header as='h2' block color='grey' textAlign='center'>
        {' '}
        Profile
      </Header>
      <div id='text-header'>
        <Header as='h2'>
          {profile.basics.name}
          <Label>
            <Icon name='code'></Icon> {profile.basics.label}
          </Label>
        </Header>
      </div>
      {/* ABOUT ME */}
      <Segment>
        <Header as='h2' dividing>
          <Icon name='user' size='small' />
          About
        </Header>
        <Segment>
          <Label attached='top left'>Summary</Label>
          <div>{profile.basics.summary}</div>
        </Segment>
      </Segment>

      {/* <!-- WORK EXPERIENCE --> */}
      {!profile.work ? (
        <Label>Work Experience section doesn't filled yet...</Label>
      ) : (
        <Segment>
          <Header as='h2' dividing>
            <Icon name='suitcase' />
            Work Experience
          </Header>

          {profile.work.map((exp, index) => {
            return (
              <Segment key={index}>
                <Header as='h3'>{exp.company}</Header>
                <Header.Subheader>
                  {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
                </Header.Subheader>

                <Segment>
                  <Label attached='top left'>Role</Label>
                  <div>{exp.position}</div>
                </Segment>
                <Segment>
                  <Label attached='top left'>Summary</Label>
                  <div>{exp.summary}</div>
                </Segment>
                <Segment>
                  <Header>Highlights</Header>
                  <List>
                    {exp.highlights &&
                      exp.highlights.map((item, index) => {
                        return (
                          <ListItem>
                            <List.Icon name='check' />
                            <List.Content
                              key={index}
                              className='list-group-item'
                            >
                              {item}
                            </List.Content>
                          </ListItem>
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
          <Header as='h2' dividing>
            <Icon name='users' />
            Volunteer
          </Header>
          {profile.volunteer.map((exp, index) => {
            return (
              <Segment key={index}>
                <Header as='h3'>{exp.organization}</Header>
                <Header.Subheader>
                  {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
                </Header.Subheader>

                <Segment>
                  <Label attached='top left'>Role</Label>
                  <div>{exp.position}</div>
                </Segment>

                <Segment>
                  <Label attached='top left'>Summary</Label>
                  <div>{exp.summary}</div>
                </Segment>

                <Header className='highlights'>Highlights</Header>
                <List>
                  {exp.highlights.map((item, index) => {
                    return (
                      <ListItem key={index}>
                        <List.Icon name='check' />
                        <List.Content>{item}</List.Content>
                      </ListItem>
                    );
                  })}
                </List>
              </Segment>
            );
          })}
        </Segment>
      )}

      <div className='box'>
        <h2>
          <i className='fas fa-users ico'></i> Volunteer
        </h2>
        <div className='job clearfix'>
          <div className='row'>
            <div className='details'>
              <div className='where'></div>
              <div className='year'>September 2015 – September 2015</div>
            </div>
          </div>
          <div className='row'>
            <div className='job-details col-xs-11'>
              <div className='profession'></div>
              <div className='description'></div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACT --> */}
      <div className='box clearfix'>
        <h2>
          <i className='fas fa-bullseye ico'></i> Contact
        </h2>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fas fa-map-marker fa-fw'></span>
          </div>

          <div className='title only  pull-right'>Adelaide, SA AU</div>
        </div>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fas fa-phone fa-fw'></span>
          </div>
          <div className='title only pull-right'>+61 410 256 252</div>
        </div>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fas fa-envelope fa-fw'></span>
          </div>
          <div className='title only pull-right'>
            <a href='mailto:oleksii.mostovyi@gmail.com' target='_blank'>
              oleksii.mostovyi@gmail.com
            </a>
          </div>
        </div>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fab fa-linkedin fa-fw'></span>
          </div>
          <div className='title pull-right'>LinkedIn</div>
          <div className='description pull-right'>
            <a
              href='https:&#x2F;&#x2F;www.linkedin.com&#x2F;in&#x2F;olimstv&#x2F;'
              target='_blank'
            >
              olimstv
            </a>
          </div>
        </div>
      </div>
      {/* <!-- EDUCATION --> */}
      <div className='box'>
        <h2>
          <i className='fas fa-university ico'></i> Education
        </h2>
        <ul id='education' className='clearfix'>
          <li>
            <div className='year pull-left'>2020 2021</div>
            <div className='description pull-right'>
              <h3>General Assembly</h3>
              <div className='where'></div>
              <p>
                <i className='fas fa-graduation-cap ico'></i> Full Stack Web
                Development course
              </p>
              <p>Software Development</p>
              <div>Courses</div>
              <ul className='list-group'>
                <li className='list-group-item'>Flex Immersive</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      {/* <!-- SKILLS --> */}
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
    </Container>
  );
}
