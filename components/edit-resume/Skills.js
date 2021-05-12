import {Button, Header, Icon, Label, ListItem, Segment, Tab, Divider} from "semantic-ui-react";

import {Fragment} from "react";

const Skills = ({
                  profile,
                  handleAddAllSkillsClick,
                  doSubprofileSkillsMatch,
                  handleSkillKeywordClick,
                  isSkillItemInSubprofile,
                  isSkillKeywordInSubrofile
                }) => {

  const numSkills = profile?.skills?.length;
  return (
    <>
      <Button
        onClick={handleAddAllSkillsClick}
        color={doSubprofileSkillsMatch ? 'green' : undefined}
        icon={doSubprofileSkillsMatch ? 'check' : 'add'}
        floated='right'
        size='mini'
      />
      <Header as='h2'>
        <Icon name='tasks'/> Skills
      </Header>
      <Segment>
        {profile.skills.map((skill, skillInd) => {

          // const ind2 = 2;

          return <>
            <Button
              color={doSubprofileSkillsMatch ? 'green' : undefined}
              icon={doSubprofileSkillsMatch ? 'check' : 'add'}
              floated='right'
              size='mini'
            />
            <div key={skillInd}>
              <Header as='h3'>{skill.name}</Header>
              <Header.Subheader>{skill.level}</Header.Subheader>
              <Divider hidden/>
              {skill.keywords && (
                <Fragment>
                  <Label ribbon>Tools &#38; Technologies</Label>
                  <Divider hidden/>
                  <Label.Group circular>
                    <Divider hidden fitted/>
                    {skill.keywords.map((keyword, keywordInd) => {
                      const isSkillKeywordInSubprofile = isSkillKeywordInSubrofile(keyword)
                      return (
                        <Label as='a'
                               key={keywordInd}
                               onClick={handleSkillKeywordClick.bind(null, skillInd, keywordInd)}
                               color={isSkillKeywordInSubprofile ? 'teal' : 'grey'}
                               basic
                        >
                          <Icon corner='top right' name={isSkillKeywordInSubprofile ? 'minus' : 'add'}/>
                          {keyword}
                        </Label>
                      );
                    })}
                  </Label.Group>
                </Fragment>
              )}
            </div>
            {skillInd < numSkills - 1 && <Divider/>}
          </>;
        })}
      </Segment>
    </>
  )
}
export default Skills;
