import {Button, Container, Divider, Header, Icon, List, ListItem} from "semantic-ui-react";
import ProfileSegment from './contact-component-segments/ProfileSegment'
import LocationSegment from "./contact-component-segments/LocationSegment";
import ContactDetailsSegment from "./contact-component-segments/ContactDetailsSegment";


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
    newSubprofile.basics.location = {...location}
    newSubprofile.basics.email = {...email}
    newSubprofile.basics.phone = {...phone}
    newSubprofile.basics.website = {...website}
    newSubprofile.basics.profiles = {...profiles}

    callOnSubprofileChange(newSubprofile)

  }
  const handleAddEmailClick = () => {
    const newSubprofile = {...subprofile}

    newSubprofile.basics.email = email

    callOnSubprofileChange(newSubprofile)
  }
  const handleAddPhoneClick = () => {
    const newSubprofile = {...subprofile}

    newSubprofile.basics.phone = phone

    callOnSubprofileChange(newSubprofile)
  }

  const handleAddWebsiteClick = () => {
    const newSubprofile = {...subprofile}

    newSubprofile.basics.website = website

    callOnSubprofileChange(newSubprofile)
  }
  const isAllProfileContactDataInSubprofile = () => {
    if (isProfileEmailInSubprofile && isProfilePhoneInSubprofile && isProfileWebsiteInSubprofile) {
      return true
    } else {
      return false
    }
    // return subprofileData.location === location &&
    //   subprofileData.email === email &&
    //   subprofileData.phone === phone &&
    //   subprofileData.website === website &&
    //   subprofileData.profiles === profiles
  }
  const isAllContactsData = isAllProfileContactDataInSubprofile()
  const isProfileLocationInSubprofile = () => {
    const profileLocationData = location
    const subprofileLocationData = subprofile.basics.location

    return profileLocationData.city === subprofileLocationData.city &&
      profileLocationData.countryCode === subprofileLocationData.countryCode &&
      profileLocationData.region === subprofileLocationData.region
  }
  const isProfileWebsiteInSubprofile = () => {
    return subprofileData.website === website
  }
  const isProfilePhoneInSubprofile = () => {
    return subprofileData.phone === phone
  }
  const isProfileEmailInSubprofile = () => {
    return subprofileData.email === email
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
  const handleAddNetworkProfileClick = (networkProfile) => {
    //clone subprofile
    const newSubprofile = {...subprofile}

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

  const onAddLocationClick = ()=>{
    const newSubprofile = {...subprofile}
    const subProfileCity = newSubprofile.basics.location.city
    const subProfileCountryCode = newSubprofile.basics.location.countryCode
    const subProfileRegion = newSubprofile.basics.location.city.region
    const profileCity = profile.basics.city
    const profileCountryCode = profile.basics.countryCode
    const profileRegion = profile.basics.region

    if(profileCity === subProfileCity &&
      profileCountryCode === subProfileCountryCode &&
      profileRegion === subProfileRegion) {
      newSubprofile.location.city = ''
      newSubprofile.location.countryCode = ''
      newSubprofile.location.region = ''
    } else {
      newSubprofile.location = {...profile.location}
    }

    callOnSubprofileChange(newSubprofile)
  }


  return (
    <>
      <Container>
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
        {isLocation &&
        <LocationSegment
            handleAddLocationClick = {onAddLocationClick}
            isProfileLocationInSubprofile={isProfileLocationInSubprofile}
            location={location}
        />}
          <ProfileSegment
              profiles={profiles}
              isNetworkProfileFoundInSubprofile={isNetworkProfileFoundInSubprofile}
              mode={mode}
              onAddNetworkProfileClick={handleAddNetworkProfileClick}
          />
        <ContactDetailsSegment
          email={email}
          phone={phone}
          website={website}
          isProfileEmailInSubprofile={isProfileEmailInSubprofile}
          isProfilePhoneInSubprofile={isProfilePhoneInSubprofile}
          isProfileWebsiteInSubprofile={isProfileWebsiteInSubprofile}
          handleAddEmailClick={handleAddEmailClick}
          handleAddPhoneClick={handleAddPhoneClick}
          handleAddWebsiteClick={handleAddWebsiteClick}
        />

      </List>
    </>
  )

}

export default Contact;