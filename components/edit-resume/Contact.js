import {Button, Container, Divider, Header, Icon, List, ListItem} from "semantic-ui-react";


const Contact = ({callOnSubprofileChange, profile, subprofile, mode}) => {
    const subprofileData = subprofile.basics
    const {email, phone, website, location, profiles} = profile.basics;
    const isEditor = mode === 'editor';
    const isSelector = mode === 'selector';
    const isLocation = (location.city !== "" && location.countryCode !== "")

    const getProfile = (title, arr) => {
      return arr.filter(el => el.network === title);
    };
    const linkedIn = getProfile('LinkedIn', profiles);
    const gitHub = getProfile('gitHub', profiles);


    const handleAddContactsClick = () => {
      const newSubprofile = {...subprofile}
      newSubprofile.basics.location = location
      newSubprofile.basics.email = email
      newSubprofile.basics.phone = phone
      newSubprofile.basics.website = website
      newSubprofile.basics.profiles = profiles

      callOnSubprofileChange(newSubprofile)

    }
    const isAllProfileContactDataInSubprofile = () => {
      // const subprofileData = subprofile.basics
      return subprofileData.location === location &&
        subprofileData.email === email &&
        subprofileData.phone === phone &&
        subprofileData.website === website &&
        subprofileData.profiles === profiles
    }
    const handleAddLocationClick = () => {
      const newSubprofile = {...subprofile}
      newSubprofile.basics.location = location

      callOnSubprofileChange(newSubprofile)
    }

    const isProfileLocationInSubprofile = () => {
      const profileLocationData = location
      const subprofileLocationData = subprofile.basics.location

      return profileLocationData.city === subprofileLocationData.city &&
        profileLocationData.countryCode === subprofileLocationData.countryCode &&
        profileLocationData.region === subprofileLocationData.region
    }
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
    const handleAddEmailClick = () => {
      const newSubprofile = {...subprofile}

      newSubprofile.basics.email = email

      callOnSubprofileChange(newSubprofile)
    }

    const isProfileEmailInSubprofile = () => {
      return subprofileData.email === email
    }
    const handleAddPhoneClick = () => {
      const newSubprofile = {...subprofile}

      newSubprofile.basics.phone = phone

      callOnSubprofileChange(newSubprofile)
    }
    const isProfilePhoneInSubprofile = () => {
      return subprofileData.phone === phone
    }
    const handleAddWebsiteClick = () => {
      const newSubprofile = {...subprofile}

      newSubprofile.basics.website = website

      callOnSubprofileChange(newSubprofile)
    }
    const isProfileWebsiteInSubprofile = () => {
      return subprofileData.website === website
    }
    const handleAddNetworkProfileClick = (networkProfile) => {
      //clone subprofile
      const newSubprofile = {...subprofile}
      // newSubprofile.basics.profiles.includes(networkProfile)

      //  Make sure the profiles array exists in subprofile
      if (!newSubprofile.basics.profiles) {
        newSubprofile.basics.profiles = []
      }

      //  Add the network profile item to the profiles
      const networkProfiles = newSubprofile.basics.profiles
      let networkIsInSubprofile = networkProfiles.filter(profile => {
        return profile.network === networkProfile.network
      })
      if (!networkIsInSubprofile.length > 0) {
        networkProfiles.push(networkProfile)
      } else {
        let newSubprofileNetworkArr = networkProfiles.filter((profileItem => {
          return profileItem.network !== networkIsInSubprofile.network
        }))
        newSubprofile.basics.profiles = newSubprofileNetworkArr
      }
      callOnSubprofileChange(newSubprofile)
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
          {isEditor && <Button icon='edit' size='mini' floated='right'/>}
          {isSelector &&
          <Button
            onClick={handleAddNetworkProfileClick(networkProfile)}
            icon={isFoundInSubprofile ? 'check' : 'add'}
            color={isFoundInSubprofile ? 'teal' : null}
            floated='right'
            size='mini'
          />}

          {iconName && <List.Icon name={iconName}/>}

          <List.Content>
            <a href={url} target={network}>
              {username}
            </a>
          </List.Content>
        </ListItem>)
    }


    const LocationSegment = ({location}) => {

      const isLocation = isProfileLocationInSubprofile()
      return (
        <ListItem>
          <Button
            onClick={handleAddLocationClick}
            floated='right'
            icon={isLocation ? 'check' : 'add'}
            color={isLocation ? 'teal' : null}
            size='mini'/>
          <List.Icon name='location arrow'/>
          <List.Content>
            {location.city}, {location.region}{' '}
            {location.countryCode}
          </List.Content>
        </ListItem>
      )
    }

    const ContactDetailsSegment = ({email, phone, website}) => {
      const isProfileEmail = isProfileEmailInSubprofile()
      const isProfilePhone = isProfilePhoneInSubprofile()
      const isProfileWebsite = isProfileWebsiteInSubprofile()
      const isProfileNetwork = isProfileWebsiteInSubprofile()
      return (<>
          {email &&
          <ListItem>
            <Button
              onClick={handleAddEmailClick}

              floated='right'
              icon={isProfileEmail ? 'check' : 'add'}
              color={isProfileEmail ? 'teal' : null}
              size='mini'/>
            <List.Icon name='mail'/>
            <List.Content>
              <a href={`mailto:{email}`} target='_blank'>
                {email}
              </a>
            </List.Content>
          </ListItem>}
          {phone && <ListItem>
            <Button
              onClick={handleAddPhoneClick}
              floated='right' icon='add' size='mini' icon={isProfilePhone ? 'check' : 'add'}
              color={isProfilePhone ? 'teal' : null}/>
            <List.Icon name='phone'/>
            <List.Content>{phone}</List.Content>
          </ListItem>}
          {website && <ListItem>
            <Button
              onClick={handleAddWebsiteClick}
              floated='right' icon='add' size='mini' icon={isProfileWebsite ? 'check' : 'add'}
              color={isProfileWebsite ? 'teal' : null}/>
            <List.Icon name='globe'/>
            <List.Content>
              <a href={`https://www.${website}`} target='_blank'>
                {website}
              </a>
            </List.Content>
          </ListItem>}

          <Divider hidden fitted/>

        </>
      )
    }

    const isAllContactsData = isAllProfileContactDataInSubprofile()

    return (
      <><Container>
        <Button
          onClick={handleAddContactsClick}
          floated='right'
          icon={isAllContactsData ? 'check' : 'add'}
          color={isAllContactsData ? 'teal' : null}
          size='mini'
        />
        <Header as='h2'>
          <Icon name='bullseye'/> Contact
        </Header>
      </Container>
        <Divider/>
        <List>
          {isLocation && <LocationSegment location={location}/>}
          <Divider hidden fitted/>
          <ContactDetailsSegment email={email} phone={phone} website={website}/>


          {profiles.map((networkProfile, ind) => {
            {/*  let {network, username, url} = networkProfile;*/
            }
            {/*  let isFoundInSubprofile = isNetworkProfileFoundInSubprofile(network);*/
            }
            {/*  let iconName;*/
            }
            {/*  switch (network) {*/
            }
            {/*    case 'LinkedIn':*/
            }
            {/*      iconName = 'linkedin';*/
            }
            {/*      break;*/
            }
            {/*    case 'gitHub':*/
            }
            {/*      iconName = 'github'*/
            }
            {/*      break;*/
            }
            {/*    case 'Twitter':*/
            }
            {/*      iconName = 'twitter'*/
            }
            {/*      break;*/
            }
            {/*    default:*/
            }
            {/*      iconName = null*/
            }
            {/*      break;*/
            }
            {/*  }*/
            }
            return (
              <ProfileSegment key={ind} networkProfile={networkProfile}/>
            );

            // return (
            //
            //   <ListItem key={ind}>
            //     {isEditor && <Button icon='edit' size='mini' floated='right'/>}
            //     {isSelector &&
            //     <Button
            //       onClick={handleAddNetworkProfileClick(networkProfile)}
            //       icon={isFoundInSubprofile ? 'check' : 'add'}
            //       color={isFoundInSubprofile ? 'teal' : null}
            //       floated='right'
            //       size='mini'
            //     />}
            //
            //     {iconName && <List.Icon name={iconName}/>}
            //
            //     <List.Content>
            //       <a href={url} target={network}>
            //         {username}
            //       </a>
            //     </List.Content>
            //   </ListItem>
            //
            // )
          })}

        </List>

      </>
    );
  }
;

export default Contact;
