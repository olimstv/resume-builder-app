import {Button, Divider, List, ListItem} from "semantic-ui-react";

export default function ContactDetailsSegment({
                                                email,
                                                phone,
                                                website,
                                                isProfileEmailInSubprofile,
                                                isProfilePhoneInSubprofile,
                                                isProfileWebsiteInSubprofile,
                                                handleAddEmailClick,
                                                handleAddPhoneClick,
                                                handleAddWebsiteClick
                                              }) {
  const isProfileEmail = isProfileEmailInSubprofile()
  const isProfilePhone = isProfilePhoneInSubprofile()
  const isProfileWebsite = isProfileWebsiteInSubprofile()
  // const isProfileNetwork = isProfileWebsiteInSubprofile()
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