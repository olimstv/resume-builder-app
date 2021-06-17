import {Button, ListItem, List} from 'semantic-ui-react/'

function getIconNameFromNetworkName(networkName) {
    switch (networkName) {
        case 'LinkedIn':
            return 'linkedin';
        case 'gitHub':
            return 'github'
        case 'Twitter':
            return 'twitter'
        default:
            return null;
    }
}

export default function ProfileSegment({profiles,
                                         isNetworkProfileFoundInSubprofile,
                                         mode,
                                         onAddNetworkProfileClick}) {

    const call_onAddNetworkProfileClick = (profile) => {
        if (!onAddNetworkProfileClick) {
            return;
        }
        onAddNetworkProfileClick(profile);
    };

    const handleCheckboxButtonClick = (profile) => {
        call_onAddNetworkProfileClick(profile);
    }

    const isEditor = mode === 'editor';
    const isSelector = mode === 'selector';
    const isLocation = (location.city !== "" && location.countryCode !== "")

    const networksDOM = [];

    const numProfiles = profiles.length;
    for (let profileInd = 0; profileInd < numProfiles; profileInd++) {
        const profile = profiles[profileInd];
        const {network, username, url} = profile;

        const iconName = getIconNameFromNetworkName(network);
        const isFoundInSubprofile = isNetworkProfileFoundInSubprofile(network);

        networksDOM.push(
            <ListItem key={profileInd}>

                {isEditor? (
                    <Button icon='edit' size='mini' floated='right'/>
                ) : null}

                {isSelector? (
                    <Button
                        onClick={handleCheckboxButtonClick.bind(null, profile)}
                        icon={isFoundInSubprofile ? 'check' : 'add'}
                        color={isFoundInSubprofile ? 'teal' : null}
                        floated='right'
                        size='mini'
                    />
                ) : null}

                {iconName && <List.Icon name={iconName}/>}

                <List.Content>
                    <a href={url} target={network}>
                        {username}
                    </a>
                </List.Content>
            </ListItem>
        );
    }

    return <>{networksDOM}</>;
}
