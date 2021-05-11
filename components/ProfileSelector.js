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

import moment from 'moment'
import * as T from 'prop-types';
import {default as lodashSet} from 'lodash/set';
import {Fragment} from 'react';
import About from "./edit-resume/About";
import Work from './edit-resume/Work'
import Volunteer from "./edit-resume/Volunteer";
import Contact from "./edit-resume/Contact";
import Education from "./edit-resume/Education";
import Skills from "./edit-resume/Skills";

export default function ProfileSelector(props) {
  const {profile, subprofile, onSubprofileChange, mode = 'editor'} = props;


  // const isNetworkProfileFoundInSubprofile = networkName => {
  //   const profiles = subprofile?.basics?.profiles;
  //   if (!profiles) {
  //     return false;
  //   }
  //   const numProfiles = profiles.length;
  //   for (let i = 0; i < numProfiles; i++) {
  //     if (profiles[i].network === networkName) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const callOnSubprofileChange = newSubprofileObject => {
    if (onSubprofileChange) {
      onSubprofileChange(newSubprofileObject);
    }
  };
  // NAME
  const handleAddNameClick = () => {
    const newSubprofile = {...subprofile};
    lodashSet(newSubprofile, 'basics.name', profile.basics.name);
    lodashSet(newSubprofile, 'basics.label', profile.basics.label);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileNamesMatch =
    profile?.basics?.name === subprofile?.basics?.name;

  // ABOUT
  const handleAddAboutClick = () => {
    const newSubprofile = {...subprofile};
    lodashSet(newSubprofile, 'basics.summary', profile.basics.summary);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileSummaryMatch =
    profile?.basics?.summary == subprofile?.basics?.summary;

  // WORK EXP (ALL)
  const handleAddWorkExperienceClick = () => {
    const newSubprofile = {...subprofile};
    lodashSet(newSubprofile, 'work', profile.work);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileWorkMatch = profile?.work === subprofile?.work;

  const handleAddWorkExperienceInstanceClick = index => {
    const newSubprofile = {...subprofile};
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
    const {company, position} = profile.work[index];
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
    const newSubprofile = {...subprofile};
    lodashSet(newSubprofile, 'volunteer', profile.volunteer);
    callOnSubprofileChange(newSubprofile);
  };

  // Button Icon
  const doSubprofileVolunteerMatch =
    profile?.volunteer === subprofile?.volunteer;

  const isVolunteerItemInSubprofile = index => {
    const {organization, position} = profile.volunteer[index];
    let match = subprofile.volunteer.some(oneSubprofileVolunteer => {
      return (
        oneSubprofileVolunteer.organization === organization &&
        oneSubprofileVolunteer.position === position
      );
    });
    console.log('match :>> ', match);
    return match;
  };
  // ADD VOLUNTEER INSTANCE
  const handleAddVolunteerInstanceClick = index => {
    const newSubprofile = {...subprofile};
    const profileVolunteerkArr = profile.volunteer;
    if (!newSubprofile.volunteer) {
      newSubprofile.volunteer = [];
    } else if (
      newSubprofile.volunteer.some(el => el === profileVolunteerkArr[index])
    ) {
      return;
    }
    newSubprofile.volunteer.push(profileVolunteerkArr[index]);
    callOnSubprofileChange(newSubprofile);
  };

  // CONTACTS (ALL)
  const handleAddContactsClick = () => {
    const newSubprofile = {...subprofile};

  };

  // Button Icon
  const doSubprofileContactsMatch = profile?.volunteer === subprofile?.volunteer;

  const handleAddContactClick = () => {
    const newSubprofile = {...subprofile};
  };

  // EDUCATION (ALL)
  const handleAddEducationClick = () => {
    const newSubprofile = {...subprofile};
    lodashSet(newSubprofile, 'education', profile.education);
    callOnSubprofileChange(newSubprofile);
  };

  // Button Icon
  const doSubprofileEducationMatch =
    profile?.education === subprofile?.education;

  const isEducationItemInSubprofile = index => {
    const {institution, area} = profile.education[index];
    let match = subprofile.education.some(oneSubprofileEducation => {
      return (
        oneSubprofileEducation.institution === institution &&
        oneSubprofileEducation.area === area
      );
    });
    console.log('match :>> ', match);
    return match;
  };
  //
  const handleAddEducationInstanceClick = index => {
    const newSubprofile = {...subprofile};
    const profileEducationArr = profile.education;
    if (!newSubprofile.education) {
      newSubprofile.education = [];
    } else if (
      newSubprofile.education.some(el => el === profileEducationArr[index])
    ) {
      return;
    }
    newSubprofile.education.push(profileEducationArr[index]);
    callOnSubprofileChange(newSubprofile);
  };

  // SKILLS
  const handleAddAllSkillsClick = () => {
    const newSubprofile = {...subprofile};
    lodashSet(newSubprofile, 'skills', profile.skills);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileSkillsMatch = profile?.skills === subprofile?.skills;

  const handleAddSkillInstanceClick = index => {
    const newSubprofile = {...subprofile};
    const profileWorkArr = profile.work;
    if (!newSubprofile.work) {
      newSubprofile.work = [];
    } else if (newSubprofile.work.some(el => el === profileWorkArr[index])) {
      return;
    }

    newSubprofile.work.push(profileWorkArr[index]);
    callOnSubprofileChange(newSubprofile);
  };

  const handleSkillKeywordClick = (skillInd, keywordInd) => {

    // Extract the skill object by its index
    const skillObj = profile.skills?.[skillInd];
    if (!skillObj) {
      throw new Error(`Invalid skill index: ${skillInd}.`);
    }
    const skillName = skillObj.name;

    // Extract the keyword string from the skill object by its index
    const keyword = skillObj.keywords?.[keywordInd];
    if (!keyword) {
      throw new Error(`Invalid skill keyword index ${keywordInd} in skill #${skillInd} (${skillName}).`);
    }

    // Clone the subprofile, so that we can update the clone and use it for the new state
    const newSubprofile = {...subprofile};

    // Make sure the skills array exists
    if (!newSubprofile.skills) {
      newSubprofile.skills = [];
    }

    // Make sure the skill object with the right name exists
    let subprofileSkillObj = newSubprofile.skills.find(skill => skill.name === skillName);
    if (!subprofileSkillObj) {
      subprofileSkillObj = {
        name: skillName,
        level: skillObj.level,
        keywords: [],
      };
      newSubprofile.skills.push(subprofileSkillObj);
    }

    // Add the keyword to the skill, but only if it is not there already
    const keywords = subprofileSkillObj.keywords;
    if (keywords.indexOf(keyword) === -1) {
      keywords.push(keyword);
    }

    callOnSubprofileChange(newSubprofile);
  }

  const isSkillItemInSubprofile = index => {
    const {company, position} = profile.work[index];
    let match = subprofile.work.some(oneSubprofileWork => {
      return (
        oneSubprofileWork.company === company &&
        oneSubprofileWork.position === position
      );
    });
    return match;
  };
  // const ProfileSegment = props => {
  //   const {network, username, url} = props.networkProfile;
  //
  //   const isFoundInSubprofile = isNetworkProfileFoundInSubprofile(network);
  //   let iconName;
  //   if (network === 'LinkedIn') {
  //     iconName = 'linkedin';
  //   } else if (network === 'gitHub') {
  //     iconName = 'github';
  //   }
  //
  //   return (
  //     <ListItem>
  //       {isEditor && <Button icon='edit' size='mini' floated='right'/>}
  //       {isSelector && (
  //         <Button
  //           icon={isFoundInSubprofile ? 'check' : 'add'}
  //           floated='right'
  //           size='mini'
  //         />
  //       )}
  //
  //       {iconName && <List.Icon name={iconName}/>}
  //
  //       <List.Content>
  //         <a href={url} target={network}>
  //           {username}
  //         </a>
  //       </List.Content>
  //     </ListItem>
  //   );
  // };

  const panes = [
      {
        menuItem: 'About',
        render: () => <Tab.Pane attached={false}>
          <About
            profile={profile}
            subprofile={subprofile}
            handleAddNameClick={handleAddNameClick}
            doSubprofileNamesMatch={doSubprofileNamesMatch}
            doSubprofileSummaryMatch={doSubprofileSummaryMatch}
            handleAddAboutClick={handleAddAboutClick}/>
        </Tab.Pane>
      },
      {
        menuItem: 'Work Experience',
        render:
          () => <Tab.Pane attached={false}>
            <Work profile={profile} handleAddWorkExperienceClick={handleAddWorkExperienceClick}
                  doSubprofileWorkMatch={doSubprofileWorkMatch}
                  handleAddWorkExperienceInstanceClick={handleAddWorkExperienceInstanceClick}
                  isWorkItemInSubprofile={isWorkItemInSubprofile}
            />
          </Tab.Pane>
      },

      {
        menuItem: 'Volunteer',
        render: () => <Tab.Pane attached={false}>
          <Volunteer
            profile={profile}
            handleAddVolunteerExperienceClick={handleAddVolunteerExperienceClick}
            doSubprofileVolunteerMatch={doSubprofileVolunteerMatch}
            isVolunteerItemInSubprofile={isVolunteerItemInSubprofile}
            handleAddVolunteerInstanceClick={handleAddVolunteerInstanceClick}

          />
        </Tab.Pane>

      },

      {
        menuItem: 'Contact',
        render: () =>
          <Tab.Pane attached={false}>
            <Contact
              subprofile={subprofile}
              profile={profile}
              mode={mode}
            />
          </Tab.Pane>

      },
      {
        menuItem: 'Education',
        render:
          () =>
            <Tab.Pane attached={false}>
              <Education
                profile={profile}
                handleAddEducationClick={handleAddEducationClick}
                doSubprofileEducationMatch={doSubprofileEducationMatch}
                isEducationItemInSubprofile={isEducationItemInSubprofile}
                handleAddEducationInstanceClick={handleAddEducationInstanceClick}
              />
            </Tab.Pane>
      },
      {
        menuItem: 'Skills',
        render:
          () =>
            <Tab.Pane attached={false}>
              <Skills
                profile={profile}
                handleAddAllSkillsClick={handleAddAllSkillsClick}
                doSubprofileSkillsMatch={doSubprofileSkillsMatch}
                handleSkillKeywordClick={handleSkillKeywordClick}

              />
            </Tab.Pane>
      },
      {
        menuItem: 'Other',
        render:
          () => (
            <Tab.Pane attached={false}>
              <Fragment>
                <Button floated='right' icon='add' size='mini'/>
                <Header as='h2'>
                  <Icon name='language'/> Languages
                </Header>
                <Divider/>
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
                    <Button floated='right' icon='add' size='mini'/>
                    <Header as='h2'>
                      <Icon name='heart'/> Interests
                    </Header>
                    <Segment>
                      <Button floated='right' icon='add' size='mini'/>
                      {profile.interests.map((interest, index) => {
                        return (
                          <div key={index}>
                            <Header as='h3'>{interest.name}</Header>
                            <Label.Group circular>
                              {interest.keywords &&
                              interest.keywords.map((keyword, index) => {
                                return (
                                  <Label as='a' key={index}>
                                    <Icon corner='top right' name='add'/>
                                    {keyword}
                                  </Label>
                                );
                              })}
                            </Label.Group>
                            <Divider hidden/>
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
                    <Button floated='right' icon='add' size='mini'/>
                    <Header as='h2'>
                      <Icon name='check square'/> References
                    </Header>
                    <Segment>
                      {/* <Button floated='right' icon='add'></Button> */}
                      {profile.references.map((ref, index) => {
                        return (
                          <div key={index}>
                            <Button floated='right' icon='add' size='mini'/>
                            <span as='h5'>{ref.reference}</span>

                            <footer>
                              <blockquote>
                                <a target='_blank'>{ref.name}</a>
                              </blockquote>
                            </footer>
                            <Divider hidden/>
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

    ]
  ;


  return (
    <Fragment>
      {/* <Header as='h2' block color='grey' textAlign='center'>
      {' '}
      Profile
    </Header> */}
      <Tab menu={{secondary: true, pointing: true}} panes={panes}/>
    </Fragment>
  );
}
ProfileSelector.propTypes =
  {
    onSubprofileChange: T.func,
    subprofile: T.object.isRequired,
    profile: T.object.isRequired,
    mode: T.oneOf(['selector', 'editor'])
  }
;
