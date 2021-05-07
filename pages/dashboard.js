import Link from 'next/link';
import dbConnect from '../util/dbConnect';
import Resume from '../models/Resume';
import React from 'react';
import { Container, Icon, Label, Menu, Table } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import withSession, {extractReqResFromArgs, useUserServerSide} from "../util/session";
import Layout from "../components/Layout";

const Dashboard = ({ resumes, user }) => {
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

  const hasResumes = resumeRows.length > 0;

  return (
      <Layout user={user}>
        <Header as='h2'>Dashboard</Header>
        {hasResumes? (
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
        ) : (
            <p>
              Start by completing your <Link href='/profile'>profile</Link>, then create your first Resume
              by clicking on the "Create Resume" link in the menu.
            </p>
        )}

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

  const result = await Resume.find({ user: user._id });

  const resumes = result.map(item => {
    const resume = item.toObject();
    resume._id = resume._id.toString();
    resume.vacancy = resume.vacancy.toString();
    resume.user = resume.user.toString();
    return resume;
  });
  // console.log('resumes :>> ', resumes);
  return { props: { resumes, user } };
});

export default Dashboard;
