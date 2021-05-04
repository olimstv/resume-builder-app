import { Container, Header } from 'semantic-ui-react';

export default function ResumeViewer(props) {
  const { subprofile } = props;

  return (
    <Container>
      <Header as='h2' block color='grey'>
        Resume Viewer
      </Header>
    </Container>
  );
}
