// import Page from '../components/Page';
import Link from 'next/link';
import dbConnect from '../../util/dbConnect';
import Resume from '../../models/Resume';

const Dashboard = ({ resumes }) => {
  let resumeRows = [];
  resumes.map(resume => {
    resumeRows.push(
      <tr key={resume.slug}>
        <td>{resume.title}</td>
        <td>
          <Link href={`resumes/${resume.slug}`}>{resume.slug}</Link>
        </td>
        <td>
          <Link href={`/resume-editor/${resume.slug}`}>edit</Link>
        </td>
        <td>
          <Link href={`/dashboard/`}>delete</Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>Dashboard</h1>

      <table>
        <thead>
          <tr>
            <th>resume title</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{resumeRows}</tbody>
      </table>
    </>
  );
};

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
    resume.user = resume.user.toString();
    return resume;
  });
  console.log('resumes :>> ', resumes);
  return { props: { resumes: resumes } };

  // const resumes = [
  //   {
  //     name: 'Complete 2021',
  //     slug: 'complete-resume-2021'
  //   },
  //   {
  //     name: 'seek.com front end 2021',
  //     slug: 'seek-front-end-2021'
  //   }
  // ];
}
export default Dashboard;
