import Button, { Container, Form, Header, TextArea } from 'semantic-ui-react';
const About = ({}) => {
  return (
    // <Form>
    //   <Form.Input>
    //     <TextArea></TextArea>
    // <Button primary>Edit</Button>
    // <Button>Save</Button>
    //   </Form.Input>
    // </Form>
    <Container>
      <Header as='h3'>About</Header>
      <TextArea placeholder='Tell us more' />
      {/* <div>
        <Button primary>Edit</Button>
        <Button>Save</Button>
      </div> */}
    </Container>
  );
};

export default About;
