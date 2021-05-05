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
  Link
} from 'semantic-ui-react';
export default function ProfileSelector(props) {
  const { profile } = props;

  const getProfile = (title, arr) => {
    return arr.filter(el => el.network === title);
  };
  const linkedIn = getProfile('LinkedIn', profile.basics.profiles);
  console.log('linkedIn:', linkedIn);
  console.log('linkedIn:', linkedIn[0].url);
  const gitHub = getProfile('gitHub', profile.basics.profiles);
  console.log('gitHub:', gitHub);

  return (
    <Segment>
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
                          <Segment>
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

                <Header>Highlights</Header>
                <List>
                  {exp.highlights.map((item, index) => {
                    return (
                      <Segment>
                        <ListItem key={index}>
                          <List.Icon name='check' />
                          <List.Content>{item}</List.Content>
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
        <Header dividing as='h2'>
          <Icon name='bullseye' /> Contact
        </Header>
        <Segment>
          <Icon name='location arrow' />
          {profile.basics.location.city}, {profile.basics.location.region}{' '}
          {profile.basics.location.countryCode}
        </Segment>
        <Segment>
          <Icon name='phone' />
          {profile.basics.phone}
        </Segment>
        <Segment>
          <Icon name='mail' />
          {/* <a href={`mailto:${profile.basics.email}`}>{profile.basics.email}</a> */}
          <a href={`mailto:{profile.basics.email}`} target='_blank'>
            {profile.basics.email}
          </a>
        </Segment>
        {linkedIn.length > 0 && (
          <Segment>
            <Icon name='linkedin' />

            <a href={linkedIn[0].url} target='_blank'>
              {linkedIn[0].username}
            </a>
          </Segment>
        )}

        {gitHub.length > 0 && (
          <Segment>
            <Icon name='github' />
            <a href={gitHub[0].url} target='_blank'>
              {gitHub[0].username}
            </a>
          </Segment>
        )}
      </Segment>

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
    </Segment>
  );
}
