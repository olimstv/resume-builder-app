import {Button, Header, Icon, Label, Segment, Divider} from "semantic-ui-react";

const Other = ({profile}) => {
  return (
    {
      menuItem: 'Other',
      render:
        () => (
          <>
            <>
              <Button floated='right' icon='add' size='mini'/>
              <Header as='h2'>
                <Icon name='language'/> Languages
              </Header>
              <Divider/>
              {profile.languages.map((language, index) => {
                return (
                  <>
                    <Header as='h3' key={index}>
                      {language.language}
                    </Header>
                    <Label>{language.fluency}</Label>
                  </>
                );
              })}
            </>

            <>
              {profile.interests && (
                <Segment>
                  <Button floated='right' icon='add' size='mini'/>
                  <Header as='h2'>
                    <Icon name='heart'/> Interests
                  </Header>
                  <Segment>
                    <Button floated='right' icon='add' size='mini'/>
                    {profile.interests.map((interest, index) => {
                      return (
                        <div key={index}>
                          <Header as='h3'>{interest.name}</Header>
                          <Label.Group circular>
                            {interest.keywords &&
                            interest.keywords.map((keyword, index) => {
                              return (
                                <Label as='a' key={index}>
                                  <Icon corner='top right' name='add'/>
                                  {keyword}
                                </Label>
                              );
                            })}
                          </Label.Group>
                          <Divider hidden/>
                        </div>
                      );
                    })}
                  </Segment>
                </Segment>
              )}
            </>

            <>
              {profile.references && (
                <Segment>
                  <Button floated='right' icon='add' size='mini'/>
                  <Header as='h2'>
                    <Icon name='check square'/> References
                  </Header>
                  <Segment>
                    {/* <Button floated='right' icon='add'></Button> */}
                    {profile.references.map((ref, index) => {
                      return (
                        <div key={index}>
                          <Button floated='right' icon='add' size='mini'/>
                          <span as='h5'>{ref.reference}</span>

                          <footer>
                            <blockquote>
                              <a target='_blank'>{ref.name}</a>
                            </blockquote>
                          </footer>
                          <Divider hidden/>
                        </div>
                      );
                    })}
                  </Segment>
                </Segment>
              )}
            </>
          </>
        )
    }
  );
};

export default Other;
