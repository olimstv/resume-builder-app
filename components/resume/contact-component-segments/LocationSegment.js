import {Divider, List} from 'semantic-ui-react';

const LocationSegment = ({location}) => {
	const isLocation = location.city !== '' && location.countryCode !== '';

	return (
		<>
			<List.Item
				icon="location arrow"
				content={`${location.city}, ${location.region} 
                ${location.countryCode}`}
			/>
			<Divider hidden fitted/>
		</>
		// {email &&
		// <ListItem>
		//
		//     <List.Icon name='mail'/>
		//     <List.Content>
		//         <a href={`mailto:{email}`} target='_blank'>
		//             {email}
		//         </a>
		//     </List.Content>
		// </ListItem>}
		// {phone &&
		// <ListItem>
		//     <List.Icon name='phone'/>
		//     <List.Content>{phone}</List.Content>
		// </ListItem>}
		// {website &&
		// <ListItem>
		//     <List.Icon name='globe'/>
		//     <List.Content>
		//         <a href={`https://www.${website}`} target='_blank'>
		//             {website}
		//         </a>
		//     </List.Content>
		// </ListItem>}
		// {profiles && profiles.map((networkProfile, ind) => {
		//     return (
		//         <ProfileSegment key={ind} networkProfile={networkProfile}/>
		//     )
		// }
	);
};

export default LocationSegment;
