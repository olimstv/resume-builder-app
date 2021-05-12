import {
  Button, Container,
  Header,
  Icon,
  Label, Segment, Tab
} from 'semantic-ui-react';
import {Fragment} from "react";


const About = ({
                 profile,
                 subprofile,
                 handleLabelItemClick,
                 isLabelInSubprofile,
                 handleAddNameClick,
                 doSubprofileNamesMatch,
                 doSubprofileSummaryMatch,
                 handleAddAboutClick
               }) => {
  const {basics, work} = subprofile;
  console.log('labels:>> ', profile.basics.label[0])
  return (

    <>
      <Fragment>
        <Container>
          <Button
            floated='right'
            size='mini'
            onClick={handleAddNameClick}
            color={doSubprofileNamesMatch ? 'teal' : null}
            icon={doSubprofileNamesMatch ? 'check' : 'add'}
          />
          <Header as='h2'>{profile.basics.name}</Header>
        </Container>
        {profile.basics.label.map((labelItem, ind) => {
          const isLabel = isLabelInSubprofile(ind)

          return (

            // <Button
            //   floated='right'
            //   size='mini'
            //   onClick={handleAddAllLabelsClick}
            //   color={isLabelInSubprofile ? 'teal' : null}
            //   icon={isLabelInSubprofile ? 'check' : 'add'}
            // />

            <Label as='a'
                   key={ind}
                   onClick={handleLabelItemClick.bind(null, ind)}
                   color={isLabel ? 'teal' : null}

            >
              <Icon corner='top right' name={isLabel ? 'minus' : 'add'}/>
              {labelItem}
            </Label>

          )
        })}

      </Fragment>
      {/* ABOUT ME */
      }

      <Segment>
        <Button
          onClick={handleAddAboutClick}
          floated='right'
          color={doSubprofileSummaryMatch ? 'teal' : null}
          icon={doSubprofileSummaryMatch ? 'check' : 'add'}
          size='mini'
        />
        <Header as='h2'>
          <Icon name='user' size='small'/>
          About
        </Header>
        <Label ribbon>Summary</Label>
        {profile.basics.summary}
      </Segment>
    </>
  )
}


export default About;
