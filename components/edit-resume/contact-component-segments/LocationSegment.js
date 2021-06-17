import {Button, List, ListItem} from "semantic-ui-react";

export default function LocationSegment({location, isProfileLocationInSubprofile, handleAddLocationClick}) {

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