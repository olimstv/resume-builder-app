import {

  Tab
} from 'semantic-ui-react';

import moment from 'moment'
import * as T from 'prop-types';
import lodashSet from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import {Fragment, useMemo} from 'react';
import About from "./edit-resume/About";
import Work from './edit-resume/Work'
import Volunteer from "./edit-resume/Volunteer";
import Contact from "./edit-resume/Contact";
import Education from "./edit-resume/Education";
import Skills from "./edit-resume/Skills";
import Other from "./edit-resume/Other";

export default function ProfileSelector(props) {
  const {profile: propsProfile, subprofile, onSubprofileChange, mode = 'editor'} = props;

  // Augment the Profile with missing elements from Subprofile,
  // so that they are editable.
  const profile = useMemo(() => {
    const profile = cloneDeep(propsProfile);

    // If any labels from subprofile basics do not exist in the profile,
    // add them there, so that they are editable as well.
    // Example: the user edits an old resume with labels that do not exist
    // anymore in the profile because it was edited since the creation
    // of the resume
    const labels = subprofile?.basics?.label;
    if (isArray(labels)) {
      const profileLabels = profile.basics.label;
      labels.forEach(subprofileLabel => {
        if (!profileLabels.includes(subprofileLabel)) {
          profileLabels.push(subprofileLabel);
        }
      });
    }
    return profile;
  }, propsProfile);


  const callOnSubprofileChange = newSubprofileObject => {
    if (onSubprofileChange) {
      onSubprofileChange(newSubprofileObject);
    }
  };
  // NAME
  const handleAddNameClick = () => {

    const newSubprofile = {...subprofile};

    lodashSet(newSubprofile, 'basics.name', profile.basics.name);
    // lodashSet(newSubprofile, 'basics.label', profile.basics.label);
    callOnSubprofileChange(newSubprofile);
  };
  // Button Icon
  const doSubprofileNamesMatch =
    profile?.basics?.name === subprofile?.basics?.name;


  const isLabelInSubprofile = (labelIndInProfile) => {
    let label = profile.basics.label[labelIndInProfile]
    return subprofile.basics.label.includes(label)

  }

  // LABEL
  const handleLabelItemClick = (labelIndInProfile) => {

    // Extract the label string from the label array by its index
    const label = profile.basics.label[labelIndInProfile]
    if (!label) {
      throw new Error(`Label with index ${labelIndInProfile} not found in array of labels.`);
    }

    // Clone the subprofile, so that we can update the clone and use it for the new state
    const newSubprofile = {...subprofile};
    // Make sure the label array exists
    if (!newSubprofile.basics.label) {
      newSubprofile.basics.label = [];
    }

    // newSubprofile.basics.label = newLabelArray;

    // Add the label item to the labels
    const labels = newSubprofile.basics.label
    if (labels.indexOf(label) === -1) {
      labels.push(label);
    } else {
      let newSubLabelsArr = labels.filter((subLabel) => {

        return subLabel !== label
      })

      newSubprofile.basics.label = newSubLabelsArr;
    }

    callOnSubprofileChange(newSubprofile);
  }


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
  //
  // const handleAddSkillInstanceClick = index => {
  //   const newSubprofile = {...subprofile};
  //   const profileWorkArr = profile.work;
  //   if (!newSubprofile.work) {
  //     newSubprofile.work = [];
  //   } else if (newSubprofile.work.some(el => el === profileWorkArr[index])) {
  //     return;
  //   }
  //
  //   newSubprofile.work.push(profileWorkArr[index]);
  //   callOnSubprofileChange(newSubprofile);
  // };

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

  const isSkillItemInSubprofile = profileSkillInd => {
    const profileSkill = profile.skills[profileSkillInd]
    return subprofile.skills.includes(profileSkill)
  };

  const panes = [
      {
        menuItem: 'About',
        render: () => <Tab.Pane attached={false}>
          <About
            profile={profile}
            subprofile={subprofile}
            isLabelInSubprofile={isLabelInSubprofile}
            handleLabelItemClick={handleLabelItemClick}
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
                isSkillItemInSubprofile={isSkillItemInSubprofile}
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
              <Other
                profile={profile}
              />
            </Tab.Pane>
          )
      }

    ]
  ;


  return (
    <Fragment>
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
