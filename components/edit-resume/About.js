import {
  Container,
  Button,
  Form,
  Header,
  TextArea,
  Icon,
  ButtonGroup
} from 'semantic-ui-react';
const About = ({ subprofile }) => {
  const { basics, work } = subprofile;
  return (
    <Container fluid>
      <Header color='blue' as='h2'>
        About
      </Header>

      <Form.TextArea
        label='About Section'
        placeholder='Tell us more'
        value={basics.summary}
      />
      <ButtonGroup floated='right'>
        <Button color='blue' icon>
          <Icon name='edit' />
        </Button>
        <Button icon>
          <Icon name='save' />
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default About;
