import {Tab} from 'semantic-ui-react';
import * as T from 'prop-types';
import lodashSet from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import {Fragment, useMemo} from 'react';
import About from './edit-resume/About';
import Work from './edit-resume/Work';
import Volunteer from './edit-resume/Volunteer';
import Contact from './edit-resume/Contact';
import Education from './edit-resume/Education';
import Skills from './edit-resume/Skills';
import Other from './edit-resume/Other';

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

		//About
		const about = subprofile?.basics?.summary;
		const profileAbouts = profile.basics.summary;
		profileAbouts.forEach(profileAbout => {
			if (profileAbout !== about) {
				profileAbouts.push(about);
			}
		});

		//if any skills keywords from subprofile do not exist in the profile,
		// add them there, so that they are editable as well.
		// Example: the user edits an old resume with sills that do not exist
		// anymore in the profile because it was edited since the creation
		// of the resume
		const subNetworkProfiles = subprofile?.basics?.profiles;
		if (isArray(subNetworkProfiles)) {
			// const {network: profileNetwork, username: profileNetworkUsername} = profile.basics.profiles
			const profileNetworks = profile.basics.profiles;
			// find if there is any network profile in the resume, which is not in the profile yet
			let difference = subNetworkProfiles.filter(subNetworkItem => {
				// returns not existing in the user profile network profile (or nothing)
				return !profileNetworks.some((networkItem) => {
					return subNetworkItem.network === networkItem.network &&
						subNetworkItem.username === networkItem.username &&
						subNetworkItem.url === networkItem.url;
				});
			});
			if (difference.length > 0) {
				difference.forEach((element) => {
					profileNetworks.push(element);
				});
			}

		}

		return profile;
	}, [propsProfile]);


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
		let label = profile.basics.label[labelIndInProfile];
		return subprofile.basics.label.includes(label);

	};

	// LABEL
	const handleLabelItemClick = (labelIndInProfile) => {

		// Extract the label string from the label array by its index
		const label = profile.basics.label[labelIndInProfile];
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
		const labels = newSubprofile.basics.label;
		if (labels.indexOf(label) === -1) {
			labels.push(label);
		} else {
			let newSubLabelsArr = labels.filter((subLabel) => {

				return subLabel !== label;
			});

			newSubprofile.basics.label = newSubLabelsArr;
		}

		callOnSubprofileChange(newSubprofile);
	};

	// ABOUT
	const handleAddAboutClick = (ind) => {
		const profileAboutData = profile.basics.summary;
		const newSubprofile = {...subprofile};

		// let subprofileAbout = newSubprofile.basics.summary
		if (newSubprofile.basics.summary === profileAboutData[ind]) {
			newSubprofile.basics.summary = '';
		} else {
			newSubprofile.basics.summary = profileAboutData[ind];
		}

		// lodashSet(newSubprofile, 'basics.summary', profile.basics.summary);


		callOnSubprofileChange(newSubprofile);

	};
	// Button Icon
	const doSubprofileSummaryMatch = ind => {
		return profile?.basics?.summary[ind] == subprofile?.basics?.summary;
	};

	// WORK EXP (ALL)
	const onAddAllWorkExperience = () => {
		const profileWorkExperience = profile.work;
		const newSubprofile = {...subprofile};
		let doWorkExpMatch = doSubprofileWorkMatch();
		if (doWorkExpMatch) {
			newSubprofile.work = [];
		} else {
			newSubprofile.work = [...profileWorkExperience];
		}
		// lodashSet(newSubprofile, 'work', profile.work);
		callOnSubprofileChange(newSubprofile);
	};
	// Button Icon
	const doSubprofileWorkMatch = () => {
		const profileWork = profile.work;
		const subprofileWork = subprofile.work;

		if (profileWork.length !== subprofileWork.length) {
			return false;
		}

		// @TODO: Make the comparison not sensitive to the order of items in both arrays
		const len = profileWork.length;
		for (let i = 0; i < len; i++) {
			const work1 = profileWork[i];
			const work2 = subprofileWork[i];
			if (work1.company !== work2.company) {
				return false;
			}
			if (work1.position !== work2.position) {
				return false;
			}

			const highlights1 = work1.highlights;
			const highlights2 = work2.highlights;
			if (highlights1.length !== highlights2.length) {
				return false;
			}

			const hLen = highlights1.length;
			for (let hInd = 0; hInd < hLen; hInd++) {
				if (highlights2.indexOf(highlights1[hInd]) === -1) {
					return false;
				}
			}
		}

		return true;
	};
// Work experience instance
	const onAddWorkExperienceInstanceClick = index => {
		const newSubprofile = {...subprofile};
		const profileWorkItem = profile.work[index];

		let subProfileWorkItemIdx = null;
		let doWorkItemMatch = isWorkItemInSubprofile(index);
		console.log('doWorkItemMatch:', doWorkItemMatch);

		if (doWorkItemMatch) {

			subProfileWorkItemIdx = newSubprofile.work.findIndex((subWorkItem) => {
				return profileWorkItem.company === subWorkItem.company &&
					profileWorkItem.position === subWorkItem.position &&
					profileWorkItem.startDate === subWorkItem.startDate;
			});

			newSubprofile.work.splice(subProfileWorkItemIdx, 1);
			console.log('subProfileWorkItemIdx :>> ', subProfileWorkItemIdx);
			console.log('profile.work after :>> ', profile.work);
		} else {
			newSubprofile.work.push(profileWorkItem);
		}

		callOnSubprofileChange(newSubprofile);
	};

	const isWorkItemInSubprofile = index => {
		const {
			company: profileWorkItemCompany,
			position: profileWorkItemPosition,
			startDate: profileWorkItemStartDate
		} = profile.work[index];
		let match = subprofile.work.some((oneSubprofileWork) => {
			return (
				oneSubprofileWork.company === profileWorkItemCompany &&
				oneSubprofileWork.position === profileWorkItemPosition &&
				oneSubprofileWork.startDate === profileWorkItemStartDate
			);
		});
		console.log('match :>> ', match);
		return match;
	};

	//Work Experience highlight
	const onAddWorkExpHighlight = (workItem, highlight) => {
		const newSubprofile = {...subprofile};
		const workExpItem = profile.work.filter(item => {
			return item.company === workItem.company &&
				item.startDate === workItem.startDate &&
				item.position === workItem.position;
		});
		const isWorkItem = isWorkItemInSubprofile(workItem);
		if (isWorkItem) {
			newSubprofile.work = profile.work.filter((item) => {
				return item.company !== workItem.company &&
					item.startDate !== workItem.startDate &&
					item.position !== workItem.position;
			});
		} else {
			newSubprofile.work.push(workExpItem);
		}

		callOnSubprofileChange(newSubprofile);
	};


	// VOLUNTEER (ALL)
	const handleAddAllVolunteerExperienceClick = () => {
		const newSubprofile = {...subprofile};
		const profileVolunteerExperience = profile.volunteer;
		const doVolunteerExpMatch = doSubprofileVolunteerMatch();
		console.log('doVolunteerExpMatch :>> ', doVolunteerExpMatch);
		if (doVolunteerExpMatch) {
			newSubprofile.volunteer = [];
		} else {
			// lodashSet(newSubprofile, 'volunteer', profile.volunteer);
			newSubprofile.volunteer = [...profileVolunteerExperience];
		}

		// if (profileVolunteerExperience.length !== newSubprofile.volunteer.length) {
		//   return false
		// }

		callOnSubprofileChange(newSubprofile);
	};

	// Button Icon
	const doSubprofileVolunteerMatch = () => {
		const profileVolunteer = profile.volunteer;
		const subprofileVolunteer = subprofile.volunteer;

		if (profileVolunteer.length !== subprofileVolunteer.length) {
			return false;
		}

		// @TODO: Make the comparison not sensitive to the order of items in both arrays
		const len = profileVolunteer.length;
		for (let i = 0; i < len; i++) {
			const volunteer1 = profileVolunteer[i];
			const volunteer2 = subprofileVolunteer[i];
			if (volunteer1.company !== volunteer2.company) {
				return false;
			}
			if (volunteer1.position !== volunteer2.position) {
				return false;
			}

			const highlights1 = volunteer1.highlights;
			const highlights2 = volunteer2.highlights;
			if (highlights1.length !== highlights2.length) {
				return false;
			}

			const hLen = highlights1.length;
			for (let hInd = 0; hInd < hLen; hInd++) {
				if (highlights2.indexOf(highlights1[hInd]) === -1) {
					return false;
				}
			}
		}

		return true;
	};

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
		const profileVolunteerItem = profile.volunteer[index];

		let subProfileVolunteerItemIdx = null;
		let doVolunteerItemMatch = isVolunteerItemInSubprofile(index);
		console.log('doVolunteerItemMatch:', doVolunteerItemMatch);

		if (doVolunteerItemMatch) {

			subProfileVolunteerItemIdx = newSubprofile.volunteer.findIndex((subVolunteerItem) => {
				return profileVolunteerItem.organization === subVolunteerItem.company &&
					profileVolunteerItem.position === subVolunteerItem.position &&
					profileVolunteerItem.startDate === subVolunteerItem.startDate;
			});

			newSubprofile.volunteer.splice(subProfileVolunteerItemIdx, 1);
		} else {
			newSubprofile.volunteer.push(profileVolunteerItem);
		}

		callOnSubprofileChange(newSubprofile);

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
				keywords: []
			};
			newSubprofile.skills.push(subprofileSkillObj);
		}

		// Add the keyword to the skill, but only if it is not there already
		const keywords = subprofileSkillObj.keywords;
		if (keywords.indexOf(keyword) === -1) {
			keywords.push(keyword);
		}

		callOnSubprofileChange(newSubprofile);
	};

	const isSkillItemInSubprofile = profileSkillInd => {
		const profileSkill = profile.skills[profileSkillInd];
		return subprofile.skills.includes(profileSkill);
	};

	const isSkillKeywordInSubrofile = (subKeyword) => {
		let allSubprofileSkillsKeywords = subprofile.skills.map((skilItem) => {

			return skilItem.keywords;

		});

		return allSubprofileSkillsKeywords.flat().includes(subKeyword);
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

						handleAddAboutClick={handleAddAboutClick}
					/>
				</Tab.Pane>
			},
			{
				menuItem: 'Work Experience',
				render:
					() => <Tab.Pane attached={false}>
						<Work profile={profile}
							  doWorkMatch={doSubprofileWorkMatch()}
							  onAddAllWorkExperience={onAddAllWorkExperience}
							  doSubprofileWorkMatch={doSubprofileWorkMatch}
							  onAddWorkExperienceInstanceClick={onAddWorkExperienceInstanceClick}
							  onAddWorkExpHighlight={onAddWorkExpHighlight}
							  isWorkItemInSubprofile={isWorkItemInSubprofile}
						/>
					</Tab.Pane>
			},

			{
				menuItem: 'Volunteer',
				render: () => <Tab.Pane attached={false}>
					<Volunteer
						profile={profile}
						handleAddAllVolunteerExperienceClick={handleAddAllVolunteerExperienceClick}
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
							callOnSubprofileChange={callOnSubprofileChange}
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
								isSkillKeywordInSubrofile={isSkillKeywordInSubrofile}

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
