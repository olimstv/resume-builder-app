import {Divider, Header, Icon, List} from 'semantic-ui-react';
import ContactDetailsSegment from '../resume/contact-component-segments/ContactDetailsSegment';
import LocationSegment from '../resume/contact-component-segments/LocationSegment';
import ProfileSegment from '../resume/contact-component-segments/ProfileSegment';


const Contact = ({basics}) => {
	const {email, phone, website, location, profiles} = basics;
	console.log('profiles (Contact):>>', profiles);
	// const isEditor = mode === 'editor';
	// const isSelector = mode === 'selector';


	const getProfile = (title, arr) => {
		return arr.filter(el => el.network === title);
	};

	const isNetworkProfileFoundInSubprofile = networkName => {
		const profiles = basics?.profiles;
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
	const isEmailInSubprofile = () => {

	};

	return (
		<>
			<Header as="h2">
			</Header>
			<Icon name="bullseye"/> Contact

			<Divider/>
			<List>
				<LocationSegment location={location}/>
				<ProfileSegment profiles={profiles}/>
				<ContactDetailsSegment/>


			</List>
			<Divider hidden fitted/>
		</>);
};

export default Contact;