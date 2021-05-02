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
          <Link href={`/resumes/${resume._id}`}>{resume.slug}</Link>
        </td>
        <td>
          <Link href={`/resumes/${resume._id}/edit`}>edit </Link>

          <Link href={`/dashboard/`}> delete</Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className='table-container'>
        <h1>Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Resume Title</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{resumeRows}</tbody>
        </table>
      </div>
    </>
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
