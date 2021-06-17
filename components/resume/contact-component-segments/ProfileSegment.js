import {List} from 'semantic-ui-react';

const ProfileSegment = ({profiles}) => {
	console.log('profiles:>>', profiles);
	const getIconNameFromNetworkName = (networkName) => {
		switch (networkName) {
			case 'LinkedIn':
				return 'linkedin';
			case 'gitHub':
				return 'github';
			case 'Twitter':
				return 'twitter';
			default:
				return null;
		}
	};

	const networksDOM = [];

	const getProfileData = (profiles) => {
		const numProfiles = profiles.length;
		console.log('numProfiles:>>', numProfiles);
		for (let profileIdx = 0; profileIdx < numProfiles; profileIdx++) {
			let profile = profiles[profileIdx];
			let {network, username, url} = profile;
			console.log('profile.network: >>', profile.network);
			console.log('profile.userName: >>', profile.username);
			console.log('profile.url: >>', profile.url);
			let icon = getIconNameFromNetworkName(network);
			networksDOM.push(
				<List.Item key={profileIdx}>
					<List.Icon name={icon}/>
					<List.Content>
						<a href={url} target={network}>
							{' '}
							{username}
						</a>
					</List.Content>
				</List.Item>
			);
		}
	};

	getProfileData(profiles);
	console.log('networksDOM:>>', networksDOM);
	return <>{networksDOM}</>;
};

export default ProfileSegment;
