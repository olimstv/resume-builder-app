import {Button, Container, Divider, Header, Icon, List, ListItem} from "semantic-ui-react";


const Contact = ({basics}) => {
  const {email, phone, website, location, profiles} = basics;

  // const isEditor = mode === 'editor';
  // const isSelector = mode === 'selector';
  const isLocation = (location.city !== "" && location.countryCode !== "")

  const getProfile = (title, arr) => {
    return arr.filter(el => el.network === title);
  };
  // const linkedIn = getProfile('LinkedIn', profiles);
  // const gitHub = getProfile('gitHub', profiles);
  // const twitter = getProfile('Twitter', profiles);


  // const handleAddContactsClick = () => {
  //   const newSubprofile = {...subprofile}
  //   newSubprofile.basics.location = location
  //   newSubprofile.basics.email = email
  //   newSubprofile.basics.phone = phone
  //   newSubprofile.basics.website = website
  //   callOnSubprofileChange(newSubprofile)
  // }
  //
  //
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

  }

  const ProfileSegment = ({networkProfile}) => {
    const {network, username, url} = networkProfile;

    const isFoundInSubprofile = isNetworkProfileFoundInSubprofile(network);
    let iconName;
    switch (network) {
      case 'LinkedIn':
        iconName = 'linkedin';
        break;
      case 'gitHub':
        iconName = 'github'
        break;
      case 'Twitter':
        iconName = 'twitter'
        break;
      default:
        iconName = null
        break;
    }

    return (
      <ListItem>
        {/*{isEditor && <Button icon='edit' size='mini' floated='right'/>}*/}
        {/*{isSelector && (*/}
        {/*  <Button*/}
        {/*    icon={isFoundInSubprofile ? 'check' : 'add'}*/}
        {/*    color={isFoundInSubprofile ? 'teal' : null}*/}
        {/*    floated='right'*/}
        {/*    size='mini'*/}
        {/*  />*/}
        {/*)}*/}

        {/*{iconName && <List.Icon name={iconName}/>}*/}

        <List.Content>
          <Icon name={iconName}/>
          <a href={url} target={network}>
            {username}
          </a>
        </List.Content>
      </ListItem>
    );
  };


  return (
    <>


      <Header as='h2'>
      </Header>
      <Icon name='bullseye'/> Contact

      <Divider/>
      <List>
        {isLocation && <ListItem>

          <List.Icon name='location arrow'/>
          <List.Content>
            {location.city}, {location.region}{' '}
            {location.countryCode}
          </List.Content>
        </ListItem>}
        <Divider hidden fitted/>

        {email &&
        <ListItem>

          <List.Icon name='mail'/>
          <List.Content>
            <a href={`mailto:{email}`} target='_blank'>
              {email}
            </a>
          </List.Content>
        </ListItem>}
        {phone &&
        <ListItem>
          <List.Icon name='phone'/>
          <List.Content>{phone}</List.Content>
        </ListItem>}
        {website &&
        <ListItem>
          <List.Icon name='globe'/>
          <List.Content>
            <a href={`https://www.${website}`} target='_blank'>
              {website}
            </a>
          </List.Content>
        </ListItem>}
        {profiles && profiles.map((networkProfile, ind) => {
          return (
            <ProfileSegment key={ind} networkProfile={networkProfile}/>
          )
        })}


      </List>
      <Divider hidden fitted/>
    </>)
};

export default Contact;