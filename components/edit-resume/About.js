import {
  Button, Container, Divider,
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
                 // handleAddAboutItemClick
                 handleAddAboutClick
               }) => {
  const {basics, work} = subprofile;

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
        <Divider/>
        <Label.Group>
          {profile.basics.label.map((labelItem, labelItemInd) => {
            const isLabel = isLabelInSubprofile(labelItemInd)

            return (
              <Label as='a'
                     key={labelItemInd}
                     onClick={handleLabelItemClick.bind(null, labelItemInd)}
                     color={isLabel ? 'teal' : 'grey'}
                     basic
                // horizizontal
              >
                <Icon name={isLabel ? 'minus' : 'add'}/>
                {labelItem}
              </Label>
            )
          })}
        </Label.Group>

      </Fragment>
      {/* ABOUT ME */
      }

      <Segment>
        <Header as='h2'>
          <Icon name='user' size='small'/>
          About
        </Header>
        {/*<Divider/>*/}
        {profile.basics.summary.map((summaryItem, ind) => {
          return (<>
              <Container>
                <Divider/>
                <Button

                  onClick={handleAddAboutClick.bind(null, ind)}
                  floated='right'
                  color={doSubprofileSummaryMatch(ind) ? 'teal' : null}
                  icon={doSubprofileSummaryMatch(ind) ? 'check' : 'add'}
                  size='mini'
                />
                {/*<Header.Subheader>Summary #1</Header.Subheader>*/}
                <Label ribbon>Summary #{ind + 1}</Label>
              </Container>
              <Divider hidden/>
              <div key={ind}> {summaryItem}</div>
            </>
          )
        })}
      </Segment>
    </>
  )
}


export default About;
