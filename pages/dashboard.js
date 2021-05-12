import Link from 'next/link';
import dbConnect from '../util/dbConnect';
import Resume from '../models/Resume';
import React from 'react';
import {Container, Icon, Button, Menu, Table} from 'semantic-ui-react';
import {Header} from 'semantic-ui-react';
import withSession, {
  extractReqResFromArgs,
  useUserServerSide
} from '../util/session';
import Layout from '../components/Layout';


const Dashboard = ({resumes, user}) => {
  const handeleDeleteResumeClick = () => {

  }
  let resumeRows = [];
  resumes.map((resume, index) => {
    resumeRows.push(
      <>
        <Table.Row>
          <Table.Cell>{resume.title}</Table.Cell>
          <Table.Cell>
            {/* <Link href='/resumes/[slug]' as={`/${resume.slug}`}> */}
            <Link href={`/resumes/${resume.slug}`}>
              <a>{resume.slug}</a>
            </Link>
          </Table.Cell>
          <Table.Cell width='three' textAlign='center'>

            <Button.Group>
              <Link href={`/resumes/edit/${resume._id}`}>
                <Button color='teal' basic icon='edit'>
                </Button>
              </Link>
              <Link href={`/dashboard/`}>
                <Button basic color='orange' icon='delete' onClick={handeleDeleteResumeClick.bind(null, index)}>
                </Button>
              </Link>
            </Button.Group>
          </Table.Cell>

        </Table.Row>
      </>
    );
  });

  const hasResumes = resumeRows.length > 0;

  return (
    <Layout user={user}>
      <Container>
        <Header as='h2'>Dashboard</Header>

        {hasResumes ? (
          <Table celled color='teal'>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Resume Title</Table.HeaderCell>
                <Table.HeaderCell>Slug</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{resumeRows}</Table.Body>
          </Table>
        ) : (
          <p>
            Start by completing your <Link href='/profile'>profile</Link>, then
            create your first Resume by clicking on the "Create Resume" link in
            the menu.
          </p>
        )}
      </Container>
    </Layout>
  );
};

// export async function getServerSideProps(context) {
export const getServerSideProps = withSession(async function (...args) {
  const {req, res} = extractReqResFromArgs(args);
  const {isLoggedIn, user, httpResponse} = useUserServerSide(req);
  if (!isLoggedIn) {
    return httpResponse;
  }

  await dbConnect();

  const result = await Resume.find({user: user._id});

  const resumes = result.map(item => {
    const resume = item.toObject();
    resume._id = resume._id.toString();

    resume.subprofile = resume.subprofile.toString();
    resume.user = resume.user.toString();
    return resume;
  });
  // console.log('resumes :>> ', resumes);
  return {props: {resumes, user}};
});

export default Dashboard;
