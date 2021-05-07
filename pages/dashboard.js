import Link from 'next/link';
import dbConnect from '../util/dbConnect';
import Resume from '../models/Resume';
import React from 'react';
import { Container, Icon, Label, Menu, Table } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import withSession, {useUserServerSide} from "../util/session";

const Dashboard = ({ resumes }) => {
  let resumeRows = [];
  resumes.map(resume => {
    resumeRows.push(
      <Table.Row key={resume._id}>
        <Table.Cell>{resume.title}</Table.Cell>
        <Table.Cell>
          {/* <Link href='/resumes/[slug]' as={`/${resume.slug}`}> */}
          <Link href={`/resumes/${resume.slug}`}>
            <a>{resume.slug}</a>
          </Link>
        </Table.Cell>
        <Table.Cell>
          {/* <Link href={`/resumes/[slug]/edit`} as={`/${resume.slug}/edit`}> */}
          <Link href={`/resumes/edit/${resume._id}`}>
            <a>edit</a>
          </Link>
          <Link href={`/dashboard/`}>
            <a>delete</a>
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Container>
      <Header as='h2'>Dashboard</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Resume Title</Table.HeaderCell>
            <Table.HeaderCell>Slug</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{resumeRows}</Table.Body>
      </Table>
    </Container>
  );
};

// export async function getServerSideProps(context) {
export const getServerSideProps = withSession(async function (req, res) {

  const {isLoggedIn, user: user2, httpResponse} = useUserServerSide(req);
  if (!isLoggedIn) {
    return httpResponse;
  }

  // console.log('context.params :>> ', params);
  // Fetch from Mongo!
  const user = {
    _id: '6090dcbc09b7fade1e520965',
    firstName: 'Oleksii',
    lastName: 'Mostovyi',
    email: 'oleksii.mostovyi@gmail.com'
  };

  await dbConnect();

  const result = await Resume.find({ user: user._id });

  const resumes = result.map(item => {
    const resume = item.toObject();
    resume._id = resume._id.toString();
    resume.vacancy = resume.vacancy.toString();
    resume.user = resume.user.toString();
    return resume;
  });
  // console.log('resumes :>> ', resumes);
  return { props: { resumes: resumes } };
});

export default Dashboard;
