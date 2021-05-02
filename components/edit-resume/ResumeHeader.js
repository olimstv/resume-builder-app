import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Form,
  Header,
  Icon,
  Grid
} from 'semantic-ui-react';

const ResumeHeader = ({ basics }) => {
  const { name, label } = basics;

  return (
    <Container fluid>
      <Header color='blue' as='h2'>
        Resume Header
      </Header>

      <Form.Input
        // error={{ content: 'Please enter your first name', pointing: 'below' }}
        fluid
        value={name}
        label='Full Name'
        placeholder='Full Name'
        id='form-input-first-name'
      />
      <ButtonGroup floated='right'>
        <Button primary icon>
          <Icon name='edit' />
        </Button>
        <Button icon>
          <Icon name='save' />
        </Button>
      </ButtonGroup>
      <Form.Input
        // error='Please enter your last name'
        value={label}
        fluid
        label='Role'
        placeholder='Role'
      />
      <ButtonGroup floated='right'>
        <Button primary icon>
          <Icon name='edit' />
        </Button>
        <Button icon>
          <Icon name='save' />
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ResumeHeader;
