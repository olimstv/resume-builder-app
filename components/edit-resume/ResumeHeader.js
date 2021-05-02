import {
  Button,
  Card,
  CardContent,
  Container,
  Form,
  Header,
  Icon
} from 'semantic-ui-react';

const ResumeHeader = ({ basics }) => {
  const { name, label } = basics;

  return (
    <Container fluid>
      <Header as='h3'>Resume Header</Header>
      <Form.Input
        // error={{ content: 'Please enter your first name', pointing: 'below' }}
        fluid
        value={name}
        label='Full Name'
        placeholder='Full Name'
        id='form-input-first-name'
      />
      <Form.Input
        // error='Please enter your last name'
        value={label}
        fluid
        label='Role'
        placeholder='Role'
      />
      <div>
        <Button.Group>
          <Button icon basic color='orange'>
            <Icon name='cancel' />
          </Button>
          <Button.Or />
          <Button icon basic color='teal'>
            <Icon name='save' />
          </Button>
        </Button.Group>
      </div>
    </Container>
  );
};

export default ResumeHeader;
