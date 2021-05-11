import {Button, Divider, Header, Icon, List, ListItem} from "semantic-ui-react";


const Contact = ({profile, subprofile, mode}) => {
  const {email, phone, website, location, profiles} = profile.basics;
  const isEditor = mode === 'editor';
  const isSelector = mode === 'selector';

  const getProfile = (title, arr) => {
    return arr.filter(el => el.network === title);
  };
  const linkedIn = getProfile('LinkedIn', profiles);
  const gitHub = getProfile('gitHub', profiles);


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

  const ProfileSegment = props => {
    const {network, username, url} = props.networkProfile;

    const isFoundInSubprofile = isNetworkProfileFoundInSubprofile(network);
    let iconName;
    if (network === 'LinkedIn') {
      iconName = 'linkedin';
    } else if (network === 'gitHub') {
      iconName = 'github';
    }

    return (
      <ListItem>
        {isEditor && <Button icon='edit' size='mini' floated='right'/>}
        {isSelector && (
          <Button
            icon={isFoundInSubprofile ? 'check' : 'add'}
            floated='right'
            size='mini'
          />
        )}

        {iconName && <List.Icon name={iconName}/>}

        <List.Content>
          <a href={url} target={network}>
            {username}
          </a>
        </List.Content>
      </ListItem>
    );
  };

  return (
    <>
      <Button
        // TODO:handleAddContactClick
        floated='right'
        icon='add'
        size='mini'
      />
      <Header as='h2'>
        <Icon name='bullseye'/> Contact
      </Header>
      <Divider/>
      <List>
        <ListItem>
          <Button floated='right' icon='add' size='mini'/>
          <List.Icon name='location arrow'/>
          <List.Content>
            {profile.basics.location.city}, {profile.basics.location.region}{' '}
            {profile.basics.location.countryCode}
          </List.Content>
        </ListItem>
        <Divider hidden fitted/>
        <ListItem>
          <Button floated='right' icon='add' size='mini'/>
          <List.Icon name='phone'/>
          <List.Content>{profile.basics.phone}</List.Content>
        </ListItem>
        <Divider hidden fitted/>
        <ListItem>
          <Button floated='right' icon='add' size='mini'/>
          <List.Icon name='mail'/>
          <List.Content>
            <a href={`mailto:{profile.basics.email}`} target='_blank'>
              {profile.basics.email}
            </a>
          </List.Content>
        </ListItem>

        {profile.basics.profiles.map((networkProfile, ind) => {
          return (
            <ProfileSegment key={ind} networkProfile={networkProfile}/>
          );
        })}
      </List>
    </>
  );
};

export default Contact;
