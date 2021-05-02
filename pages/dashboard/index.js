import Link from 'next/link';
import dbConnect from '../../util/dbConnect';
import Resume from '../../models/Resume';
import React from 'react';
import { Container, Icon, Label, Menu, Table } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';

const Dashboard = ({ resumes }) => {
  let resumeRows = [];
  resumes.map(resume => {
    resumeRows.push(
      <Table.Row key={resume.slug}>
        <Table.Cell>{resume.title}</Table.Cell>
        <Table.Cell>
          <Link href={`/resumes/${resume.slug}`}>{resume.slug}</Link>
        </Table.Cell>
        <Table.Cell>
          <Link href={`/resumes/edit/${resume.slug}`}>edit </Link>
          <Link href={`/dashboard/`}>delete</Link>
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
export async function getServerSideProps(context) {
  // Fetch from Mongo!
  const user = {
    _id: '608a8471dbb3c253e4d4e175',
    firstName: 'test',
    lastName: 'test',
    email: 'oli@moli.com'
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
}
export default Dashboard;
