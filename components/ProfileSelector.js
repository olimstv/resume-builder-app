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
  IconGroup,
  Tab
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

  const callOnSubprofileChange = newSubprofileObject => {
    if (onSubprofileChange) {
      onSubprofileChange(newSubprofileObject);
    }
  };
  // NAME
  const handleAddNameClick = () => {
    const newSubprofile = { ...subprofile };
    lodashSet(newSubprofile, 'basics.name', profile.basics.name);
    lodashSet(newSubprofile, 'basics.label', profile.basics.label);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileNamesMatch =
    profile?.basics?.name === subprofile?.basics?.name;

  // ABOUT
  const handleAddAboutClick = () => {
    const newSubprofile = { ...subprofile };
    lodashSet(newSubprofile, 'basics.summary', profile.basics.summary);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileSummaryMatch =
    profile?.basics?.summary === subprofile?.basics?.summary;

  // WORK EXP (ALL)
  const handleAddWorkExperienceClick = () => {
    const newSubprofile = { ...subprofile };
    lodashSet(newSubprofile, 'work', profile.work);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileWorkMatch = profile?.work === subprofile?.work;

  const handleAddWorkExperienceInstanceClick = index => {
    const newSubprofile = { ...subprofile };
    const profileWorkArr = profile.work;
    if (!newSubprofile.work) {
      newSubprofile.work = [];
    } else if (newSubprofile.work.some(el => el === profileWorkArr[index])) {
      return;
    }

    newSubprofile.work.push(profileWorkArr[index]);
    callOnSubprofileChange(newSubprofile);
  };
  const isWorkItemInSubprofile = index => {
    const { company, position } = profile.work[index];
    let match = subprofile.work.some(oneSubprofileWork => {
      return (
        oneSubprofileWork.company === company &&
        oneSubprofileWork.position === position
      );
    });
    return match;
  };
  // VOLUNTEER (ALL)
  const handleAddVolunteerExperienceClick = () => {
    const newSubprofile = { ...subprofile };
    lodashSet(newSubprofile, 'volunteer', profile.volunteer);
    callOnSubprofileChange(newSubprofile);
  };

  // Button Icon
  const doSubprofileVolunteerMatch =
    profile?.volunteer === subprofile?.volunteer;

  // // CONTACTS (ALL)
  //   const handleAddContactsClick = () => {
  //     const newSubprofile = { ...subprofile };
  //     lodashSet(newSubprofile, 'volunteer', profile.volunteer);
  //     callOnSubprofileChange(newSubprofile);
  //   };

  //   // Button Icon
  //   const doSubprofileContactsMatch = profile?.volunteer === subprofile?.volunteer;

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
      <ListItem>
        {isEditor && <Button icon='edit' size='mini' floated='right' />}
        {isSelector && (
          <Button
            icon={isFoundInSubprofile ? 'check' : 'add'}
            floated='right'
            size='mini'
          />
        )}

        {iconName && <List.Icon name={iconName} />}

        <List.Content>
          <a href={url} target={network}>
            {username}
          </a>
        </List.Content>
      </ListItem>
    );
  };

  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <Tab.Pane attached={false}>
          <Fragment>
            <Button
              floated='right'
              size='mini'
              onClick={handleAddNameClick}
              color={doSubprofileNamesMatch && 'green'}
              icon={doSubprofileNamesMatch ? 'check' : 'add'}
            />
            <Header as='h2'>{profile.basics.name}</Header>
            <Label>{profile.basics.label}</Label>
          </Fragment>
          {/* ABOUT ME */}

          <Segment>
            <Button
              onClick={handleAddAboutClick}
              floated='right'
              color={doSubprofileSummaryMatch && 'green'}
              icon={doSubprofileSummaryMatch ? 'check' : 'add'}
              size='mini'
            />
            <Header as='h2'>
              <Icon name='user' size='small' />
              About
            </Header>
            <Label ribbon>Summary</Label>
            {profile.basics.summary}
          </Segment>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Work Experience',
      render: () => (
        <Tab.Pane attached={false}>
          <Button
            onClick={handleAddWorkExperienceClick}
            floated='right'
            color={doSubprofileWorkMatch && 'green'}
            icon={doSubprofileWorkMatch ? 'check' : 'add'}
            size='mini'
          />{' '}
          <Header as='h2'>
            <Icon name='suitcase' />
            Work Experience
          </Header>
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
                  color={isInSubprofile && 'green'}
                  icon={isInSubprofile ? 'check' : 'add'}
                  size='mini'
                />
                <Header as='h3'>{exp.company}</Header>
                <Header.Subheader>
                  {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
                </Header.Subheader>
                <Fragment>
                  <Divider hidden />
                  <Label ribbon>Role</Label>
                  {exp.position}
                </Fragment>
                <Fragment>
                  <Divider hidden />
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
                        const isInSubprofile = doSubprofileWorkMatch;
                        return (
                          <Fragment key={index}>
                            <Button
                              floated='right'
                              color={isInSubprofile && 'green'}
                              icon={isInSubprofile ? 'check' : 'add'}
                              size='mini'
                            ></Button>
                            <ListItem key={index}>
                              <List.Icon name='check' />
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
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Volunteer',
      render: () => (
        <Tab.Pane attached={false}>
          {' '}
          {!profile.volunteer ? (
            <Label>Volunteer section doesn't filled yet...</Label>
          ) : (
            <Segment>
              <Button
                onClick={handleAddVolunteerExperienceClick}
                floated='right'
                color={doSubprofileVolunteerMatch && 'green'}
                icon={doSubprofileVolunteerMatch ? 'check' : 'add'}
                size='mini'
              />
              <Header as='h2'>
                <Icon name='users' />
                Volunteer
              </Header>
              {profile.volunteer.map((exp, index) => {
                return (
                  <Segment key={index}>
                    <Button
                      floated='right'
                      color={doSubprofileVolunteerMatch && 'green'}
                      icon={doSubprofileVolunteerMatch ? 'check' : 'add'}
                      size='mini'
                    />
                    <Header as='h3'>{exp.organization}</Header>
                    <Header.Subheader>
                      {exp.startDate} -{' '}
                      {!exp.endDate ? `till now` : exp.endDate}
                    </Header.Subheader>

                    <div>
                      <Label ribbon>Role</Label>
                      {/* <Header as='h3'>{exp.position}</Header> */}
                      {exp.position}
                      <Divider hidden />
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
                              color={doSubprofileVolunteerMatch && 'green'}
                              icon={
                                doSubprofileVolunteerMatch ? 'check' : 'add'
                              }
                              size='mini'
                            />
                            <ListItem key={index}>
                              <List.Content>
                                <List.Icon name='check' />
                                {item}
                              </List.Content>
                            </ListItem>
                            <Divider hidden />
                          </Fragment>
                        );
                      })}
                    </List>
                  </Segment>
                );
              })}
            </Segment>
          )}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Contact',
      render: () => (
        <Tab.Pane attached={false}>
          {' '}
          <Button floated='right' icon='add' size='mini' />
          <Header as='h2'>
            <Icon name='bullseye' /> Contact
          </Header>
          <Divider />
          <List>
            <ListItem>
              <Button floated='right' icon='add' size='mini' />
              <List.Icon name='location arrow' />
              <List.Content>
                {profile.basics.location.city}, {profile.basics.location.region}{' '}
                {profile.basics.location.countryCode}
              </List.Content>
            </ListItem>
            <Divider hidden fitted />
            <ListItem>
              <Button floated='right' icon='add' size='mini' />
              <List.Icon name='phone' />
              <List.Content>{profile.basics.phone}</List.Content>
            </ListItem>
            <Divider hidden fitted />
            <ListItem>
              <Button floated='right' icon='add' size='mini' />
              <List.Icon name='mail' />
              <List.Content>
                <a href={`mailto:{profile.basics.email}`} target='_blank'>
                  {profile.basics.email}
                </a>
              </List.Content>
            </ListItem>

            {profile.basics.profiles.map((networkProfile, ind) => {
              return (
                <ProfileSegment key={ind} networkProfile={networkProfile} />
              );
            })}
          </List>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Education',
      render: () => (
        <Tab.Pane attached={false}>
          {' '}
          <Segment>
            <Button floated='right' icon='add' size='mini' />
            <Header as='h2'>
              <Icon name='university' /> Education
            </Header>

            {profile.education.map((exp, index) => {
              return (
                <Segment key={index}>
                  <Button floated='right' icon='add' size='mini' />
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
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Skills',
      render: () => (
        <Tab.Pane attached={false}>
          {' '}
          <Button floated='right' icon='add' size='mini' />
          <Header as='h2'>
            <Icon name='tasks' /> Skills
          </Header>
          <Segment>
            <Button floated='right' icon='add' size='mini' />
            {profile.skills.map((skill, index) => {
              return (
                <div key={index}>
                  <Header as='h3'>{skill.name}</Header>
                  <Header.Subheader>{skill.level}</Header.Subheader>
                  <Divider hidden />
                  {skill.keywords && (
                    <Fragment>
                      <Label ribbon>Tools &#38; Technologies</Label>
                      <Divider hidden />
                      <Label.Group circular>
                        <Divider hidden fitted />
                        {skill.keywords.map((word, index) => {
                          return (
                            <Label as='a' key={index}>
                              <Icon corner='top right' name='add' />
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
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Other',
      render: () => (
        <Tab.Pane attached={false}>
          <Fragment>
            <Button floated='right' icon='add' size='mini' />
            <Header as='h2'>
              <Icon name='language' /> Languages
            </Header>
            <Divider />
            {profile.languages.map((language, index) => {
              return (
                <Fragment>
                  <Header as='h3' key={index}>
                    {language.language}
                  </Header>
                  <Label>{language.fluency}</Label>
                </Fragment>
              );
            })}
          </Fragment>

          <Fragment>
            {profile.interests && (
              <Segment>
                <Button floated='right' icon='add' size='mini' />
                <Header as='h2'>
                  <Icon name='heart' /> Interests
                </Header>
                <Segment>
                  <Button floated='right' icon='add' size='mini' />
                  {profile.interests.map((interest, index) => {
                    return (
                      <div key={index}>
                        <Header as='h3'>{interest.name}</Header>
                        <Label.Group circular>
                          {interest.keywords &&
                            interest.keywords.map((keyword, index) => {
                              return (
                                <Label as='a' key={index}>
                                  <Icon corner='top right' name='add' />
                                  {keyword}
                                </Label>
                              );
                            })}
                        </Label.Group>
                        <Divider hidden />
                      </div>
                    );
                  })}
                </Segment>
              </Segment>
            )}
          </Fragment>

          <Fragment>
            {profile.references && (
              <Segment>
                <Button floated='right' icon='add' size='mini' />
                <Header as='h2'>
                  <Icon name='check square' /> References
                </Header>
                <Segment>
                  {/* <Button floated='right' icon='add'></Button> */}
                  {profile.references.map((ref, index) => {
                    return (
                      <div key={index}>
                        <Button floated='right' icon='add' size='mini' />
                        <span as='h5'>{ref.reference}</span>

                        <footer>
                          <blockquote>
                            <a target='_blank'>{ref.name}</a>
                          </blockquote>
                        </footer>
                        <Divider hidden />
                      </div>
                    );
                  })}
                </Segment>
              </Segment>
            )}
          </Fragment>
        </Tab.Pane>
      )
    }
  ];
  // const TabExampleBasicAll = () => <Tab panes={panes} renderActiveOnly={false} />
  return (
    <Fragment>
      <Header as='h2' block color='grey' textAlign='center'>
        {' '}
        Profile
      </Header>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Fragment>

    //     {/* <!-- WORK EXPERIENCE --> */}
    //     {!profile.work ? (
    //       <Label>Work Experience section doesn't filled yet...</Label>
    //     ) : (
    //       <Segment>
    // <Button
    //   onClick={handleAddWorkExperienceClick}
    //   floated='right'
    //   color={doSubprofileWorkMatch && 'green'}
    //   icon={doSubprofileWorkMatch ? 'check' : 'add'}
    //   size='mini'
    // />

    // <Header as='h2'>
    //   <Icon name='suitcase' />
    //   Work Experience
    // </Header>
    // {/* <Divider /> */}

    // {profile.work.map((exp, index) => {
    //   const isInSubprofile = isWorkItemInSubprofile(index);
    //   return (
    //     <Segment key={index}>
    //       <Button
    //         onClick={handleAddWorkExperienceInstanceClick.bind(
    //           this,
    //           index
    //         )}
    //         floated='right'
    //         color={isInSubprofile && 'green'}
    //         icon={isInSubprofile ? 'check' : 'add'}
    //         size='mini'
    //       />
    //       <Header as='h3'>{exp.company}</Header>
    //       <Header.Subheader>
    //         {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
    //       </Header.Subheader>

    //       <Fragment>
    //         <Divider hidden />
    //         <Label ribbon>Role</Label>
    //         {exp.position}
    //       </Fragment>
    //       <Fragment>
    //         <Divider hidden />
    //         <Label ribbon>Summary</Label>
    //         {exp.summary}
    //       </Fragment>
    //       <Fragment>
    //         {/* <Button  floated='right' icon='add' size='mini' /> */}
    //         {/* <Divider /> */}
    //         <Header>Highlights</Header>
    //         <List>
    //           {exp.highlights &&
    //             exp.highlights.map((item, index) => {
    //               const isInSubprofile = doSubprofileWorkMatch;
    //               return (
    //                 <Fragment key={index}>
    //                   <Button
    //                     floated='right'
    //                     color={isInSubprofile && 'green'}
    //                     icon={isInSubprofile ? 'check' : 'add'}
    //                     size='mini'
    //                   ></Button>
    //                   <ListItem key={index}>
    //                     <List.Icon name='check' />
    //                     <List.Content
    //                       key={index}
    //                       className='list-group-item'
    //                     >
    //                       {item}
    //                     </List.Content>
    //                   </ListItem>
    //                 </Fragment>
    //               );
    //             })}
    //         </List>
    //       </Fragment>
    //     </Segment>
    //   );
    // })}
    // </Segment>
    //     )}
    //     {/* <!-- VOLUNTEER --> */}

    // {!profile.volunteer ? (
    //   <Label>Volunteer section doesn't filled yet...</Label>
    // ) : (
    //   <Segment>
    //     <Button
    //       onClick={handleAddVolunteerExperienceClick}
    //       floated='right'
    //       color={doSubprofileVolunteerMatch && 'green'}
    //       icon={doSubprofileVolunteerMatch ? 'check' : 'add'}
    //       size='mini'
    //     />
    //     <Header as='h2'>
    //       <Icon name='users' />
    //       Volunteer
    //     </Header>
    //     {profile.volunteer.map((exp, index) => {
    //       return (
    //         <Segment key={index}>
    //           <Button
    //             floated='right'
    //             color={doSubprofileVolunteerMatch && 'green'}
    //             icon={doSubprofileVolunteerMatch ? 'check' : 'add'}
    //             size='mini'
    //           />
    //           <Header as='h3'>{exp.organization}</Header>
    //           <Header.Subheader>
    //             {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
    //           </Header.Subheader>

    //           <div>
    //             <Label ribbon>Role</Label>
    //             {/* <Header as='h3'>{exp.position}</Header> */}
    //             {exp.position}
    //             <Divider hidden />
    //           </div>

    //           <Fragment>
    //             <Label ribbon>Summary</Label>
    //             {exp.summary}
    //           </Fragment>

    //           <Header>Highlights</Header>
    //           {/* <Divider /> */}
    //           <List>
    //             {exp.highlights.map((item, index) => {
    //               return (
    //                 <Fragment key={index}>
    //                   <Button
    //                     floated='right'
    //                     color={doSubprofileVolunteerMatch && 'green'}
    //                     icon={doSubprofileVolunteerMatch ? 'check' : 'add'}
    //                     size='mini'
    //                   />
    //                   <ListItem key={index}>
    //                     <List.Content>
    //                       <List.Icon name='check' />
    //                       {item}
    //                     </List.Content>
    //                   </ListItem>
    //                   <Divider hidden />
    //                 </Fragment>
    //               );
    //             })}
    //           </List>
    //         </Segment>
    //       );
    //     })}
    //   </Segment>
    // )}
    //     {/* <!-- CONTACT --> */}

    //     <Segment>
    // <Button floated='right' icon='add' size='mini' />
    // <Header as='h2'>
    //   <Icon name='bullseye' /> Contact
    // </Header>
    // <Divider />
    // <List>
    //   <ListItem>
    //     <Button floated='right' icon='add' size='mini' />
    //     <List.Icon name='location arrow' />
    //     <List.Content>
    //       {profile.basics.location.city}, {profile.basics.location.region}{' '}
    //       {profile.basics.location.countryCode}
    //     </List.Content>
    //   </ListItem>
    //   <Divider hidden fitted />
    //   <ListItem>
    //     <Button floated='right' icon='add' size='mini' />
    //     <List.Icon name='phone' />
    //     <List.Content>{profile.basics.phone}</List.Content>
    //   </ListItem>
    //   <Divider hidden fitted />
    //   <ListItem>
    //     <Button floated='right' icon='add' size='mini' />
    //     <List.Icon name='mail' />
    //     <List.Content>
    //       <a href={`mailto:{profile.basics.email}`} target='_blank'>
    //         {profile.basics.email}
    //       </a>
    //     </List.Content>
    //   </ListItem>

    //   {profile.basics.profiles.map((networkProfile, ind) => {
    //     return <ProfileSegment key={ind} networkProfile={networkProfile} />;
    //   })}
    // </List>
    //     </Segment>

    //     {/* <!-- EDUCATION --> */}

    // <Segment>
    //   <Button floated='right' icon='add' size='mini' />
    //   <Header as='h2'>
    //     <Icon name='university' /> Education
    //   </Header>

    //   {profile.education.map((exp, index) => {
    //     return (
    //       <Segment key={index}>
    //         <Button floated='right' icon='add' size='mini' />
    //         <Header as='h3'>{exp.institution}</Header>
    //         <Header.Subheader>
    //           {exp.startDate} - {!exp.endDate ? `till now` : exp.endDate}
    //         </Header.Subheader>

    //         <div className='description pull-right'>
    //           <Header as='h4'>{exp.Area}</Header>
    //           <Header.Subheader>{exp.studyType}</Header.Subheader>

    //           {exp.courses &&
    //             exp.courses.map((course, index) => {
    //               return (
    //                 <ListItem key={index}>
    //                   <List.Content>
    //                     {' '}
    //                     <List.Icon name='book' />
    //                     {course}
    //                   </List.Content>
    //                 </ListItem>
    //               );
    //             })}
    //         </div>
    //       </Segment>
    //     );
    //   })}
    // </Segment>

    //     {/* <!-- SKILLS --> */}

    //     <Segment>
    // <Button floated='right' icon='add' size='mini' />
    // <Header as='h2'>
    //   <Icon name='tasks' /> Skills
    // </Header>

    // <Segment>
    //   <Button floated='right' icon='add' size='mini' />
    //   {profile.skills.map((skill, index) => {
    //     return (
    //       <div key={index}>
    //         <Header as='h3'>{skill.name}</Header>
    //         <Header.Subheader>{skill.level}</Header.Subheader>
    //         <Divider hidden />
    //         {skill.keywords && (
    //           <Fragment>
    //             <Label ribbon>Tools &#38; Technologies</Label>
    //             <Divider hidden />
    //             <Label.Group circular>
    //               <Divider hidden fitted />
    //               {skill.keywords.map((word, index) => {
    //                 return (
    //                   <Label as='a' key={index}>
    //                     <Icon corner='top right' name='add' />
    //                     {word}
    //                   </Label>
    //                 );
    //               })}
    //             </Label.Group>
    //           </Fragment>
    //         )}
    //       </div>
    //     );
    //   })}
    // </Segment>
    //     </Segment>
    //     {/* <!-- HOBBIES --> */}

    // {profile.interests && (
    //   <Segment>
    //     <Button floated='right' icon='add' size='mini' />
    //     <Header as='h2'>
    //       <Icon name='heart' /> Interests
    //     </Header>
    //     <Segment>
    //       <Button floated='right' icon='add' size='mini' />
    //       {profile.interests.map((interest, index) => {
    //         return (
    //           <div key={index}>
    //             <Header as='h3'>{interest.name}</Header>
    //             <Label.Group circular>
    //               {interest.keywords &&
    //                 interest.keywords.map((keyword, index) => {
    //                   return (
    //                     <Label as='a' key={index}>
    //                       <Icon corner='top right' name='add' />
    //                       {keyword}
    //                     </Label>
    //                   );
    //                 })}
    //             </Label.Group>
    //             <Divider hidden />
    //           </div>
    //         );
    //       })}
    //     </Segment>
    //   </Segment>
    // )}

    // {/* References */}
    // {profile.references && (
    //   <Segment>
    //     <Button floated='right' icon='add' size='mini' />
    //     <Header as='h2'>
    //       <Icon name='check square' /> References
    //     </Header>
    //     <Segment>
    //       {/* <Button floated='right' icon='add'></Button> */}
    //       {profile.references.map((ref, index) => {
    //         return (
    //           <div key={index}>
    //             <Button floated='right' icon='add' size='mini' />
    //             <span as='h5'>{ref.reference}</span>

    //             <footer>
    //               <blockquote>
    //                 <a target='_blank'>{ref.name}</a>
    //               </blockquote>
    //             </footer>
    //             <Divider hidden />
    //           </div>
    //         );
    //       })}
    //     </Segment>
    //   </Segment>
    //     )}
    //   </Fragment>
  );
}

ProfileSelector.propTypes = {
  onSubprofileChange: T.func,
  subprofile: T.object.isRequired,
  profile: T.object.isRequired,
  mode: T.oneOf(['selector', 'editor'])
};
