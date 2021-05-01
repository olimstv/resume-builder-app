import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import dbConnect from '../../util/dbConnect';
import Resume from '../../models/Resume';
import ResumeHeader from '../../components/resume/ResumeHeader';
// import styles from '../../css/resume.css';

export const getStaticPaths = async () => {
  const user = {
    _id: '608a8471dbb3c253e4d4e175',
    firstName: 'test',
    lastName: 'test',
    email: 'oli@moli.com'
  };
  await dbConnect();

  const data = await Resume.find({ user: user._id });

  const paths = data.map(item => {
    const resume = item.toObject();
    resume._id = resume._id.toString();
    resume.vacancy = resume.vacancy.toString();
    resume.user = resume.user.toString();
    // resume.user = resume.user.toString();

    return `/resumes/${resume._id}`;
  });

  return {
    paths,
    fallback: false
  };
};

// export const getStaticProps = async context => {
//   try {
//     await dbConnect();
//     const id = context.params.id;
//     const data = await Resume.findOne({ _id: id });

//     console.log('data :>> ', data);
//     console.log('context.params.id :>> ', id);
//     return {
//       props: {
//         resume: data
//       }
//     };
//   } catch (err) {
//     console.error(err);
//   }
// };

const PublicCvPage = ({ resume }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const { basics, work, volunteer, education, skills, specific } = resume;
  const {
    name,
    label,
    picture,
    email,
    phone,
    website,
    summary,
    location,
    profiles
  } = basics;
  let gitHubArr = profiles.filter(profile => {
    return profile.network === 'GitHub';
  });
  const gitHub = gitHubArr[0];

  const { address, postalCode, city, countryCode, region } = location;

  // check
  console.log('skills :>> ', skills);
  return <ResumeHeader basics={basics} />;

  //   return (
  //     <div className='container'>
  //       <h1>Public CV Page</h1>

  //       <div className='row'>
  //         <div className='col-xs-12'>
  //           <div id='photo-header' className='text-center'>
  //             <div id='photo'>
  //               {/* <img src="&#x2F;&#x2F;www.gravatar.com&#x2F;avatar&#x2F;9813b0f6ac7585c3a21c2565e6b1be0a?s&#x3D;200&amp;r&#x3D;pg&amp;d&#x3D;mm" alt="avatar"> */}
  //             </div>

  //             <div id='text-header'>
  //               <h1>
  //                 {name}
  //                 <span>{label}</span>
  //               </h1>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <div className='row'>
  //         <div className='col-xs-12 col-sm-7'>
  //           {/* <!-- ABOUT ME --> */}
  //           <div className='box'>
  //             <h2>
  //               <i className='fas fa-user ico'></i> About
  //             </h2>
  //             <p>{specific.basics.personalDescription}</p>
  //           </div>

  //           {work && (
  //             <div className='box'>
  //             <h2>
  //               <i className='fas fa-suitcase ico'></i> Work Experience
  //             </h2>
  //             <div className='job clearfix'>
  //               <div className='row'>
  //                 <div className='details'>
  //                   <div className='where'></div>
  //                   <div className='year'>{}</div>
  //                 </div>
  //               </div>
  //               <div className='row'>
  //                 <div className='job-details col-xs-11'>
  //                   <div className='profession'>
  //                     Software Testing Automation Engineer
  //                   </div>
  //                   <div className='description'>
  //                     Description...
  //                     <div className='highlights'>Highlights</div>
  //                     <ul className='list-group'>
  //                       <li className='list-group-item'>
  //                         System components and functions analysis
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Reviewing design inputs according to the scope of
  //                         testing issues
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Creation and updating of UI and Functional Test
  //                         Cases(manual and automation)
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Automated test code-review and test stabilization
  //                       </li>
  //                     </ul>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           )}

  //             <div className='job clearfix'>
  //               <div className='row'>
  //                 <div className='details'>
  //                   <div className='where'></div>
  //                   <div className='year'>September 2015 – July 2017</div>
  //                 </div>
  //               </div>
  //               <div className='row'>
  //                 <div className='job-details col-xs-11'>
  //                   <div className='profession'>
  //                     Quality Assurance Test Engineer
  //                   </div>
  //                   <div className='description'>
  //                     Description...
  //                     <div className='highlights'>Highlights</div>
  //                     <ul className='list-group'>
  //                       <li className='list-group-item'>
  //                         System components and functions analysis
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Reviewing design inputs according to the scope of
  //                         testing issues
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Creation and updating of UI and Functional Test
  //                         Cases(manual and automation)
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Automated test code-review and test stabilization
  //                       </li>
  //                     </ul>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className='job clearfix'>
  //               <div className='row'>
  //                 <div className='details'>
  //                   <div className='where'></div>
  //                   <div className='year'>September 2015 – July 2017</div>
  //                 </div>
  //               </div>
  //               <div className='row'>
  //                 <div className='job-details col-xs-11'>
  //                   <div className='profession'>
  //                     Software Testing Automation Engineer
  //                   </div>
  //                   <div className='description'>
  //                     Description...
  //                     <div className='highlights'>Highlights</div>
  //                     <ul className='list-group'>
  //                       <li className='list-group-item'>
  //                         System components and functions analysis
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Reviewing design inputs according to the scope of
  //                         testing issues
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Creation and updating of UI and Functional Test
  //                         Cases(manual and automation)
  //                       </li>
  //                       <li className='list-group-item'>
  //                         Automated test code-review and test stabilization
  //                       </li>
  //                     </ul>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           {/* <!-- VOLUNTEER --> */}
  //           <div className='box'>
  //             <h2>
  //               <i className='fas fa-users ico'></i> Volunteer
  //             </h2>
  //             <div className='job clearfix'>
  //               <div className='row'>
  //                 <div className='details'>
  //                   <div className='where'></div>
  //                   <div className='year'>September 2015 – September 2015</div>
  //                 </div>
  //               </div>
  //               <div className='row'>
  //                 <div className='job-details col-xs-11'>
  //                   <div className='profession'></div>
  //                   <div className='description'></div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className='col-xs-12 col-sm-5'>
  //           {/* <!-- CONTACT --> */}
  //           <div className='box clearfix'>
  //             <h2>
  //               <i className='fas fa-bullseye ico'></i> Contact
  //             </h2>
  //             <div className='contact-item'>
  //               <div className='icon pull-left text-center'>
  //                 <span className='fas fa-map-marker fa-fw'></span>
  //               </div>

  //               <div className='title only  pull-right'>Adelaide, SA AU</div>
  //             </div>
  //             <div className='contact-item'>
  //               <div className='icon pull-left text-center'>
  //                 <span className='fas fa-phone fa-fw'></span>
  //               </div>
  //               <div className='title only pull-right'>+61 410 256 252</div>
  //             </div>
  //             <div className='contact-item'>
  //               <div className='icon pull-left text-center'>
  //                 <span className='fas fa-envelope fa-fw'></span>
  //               </div>
  //               <div className='title only pull-right'>
  //                 <a href='mailto:oleksii.mostovyi@gmail.com' target='_blank'>
  //                   oleksii.mostovyi@gmail.com
  //                 </a>
  //               </div>
  //             </div>
  //             <div className='contact-item'>
  //               <div className='icon pull-left text-center'>
  //                 <span className='fab fa-linkedin fa-fw'></span>
  //               </div>
  //               <div className='title pull-right'>LinkedIn</div>
  //               <div className='description pull-right'>
  //                 <a
  //                   href='https:&#x2F;&#x2F;www.linkedin.com&#x2F;in&#x2F;olimstv&#x2F;'
  //                   target='_blank'
  //                 >
  //                   olimstv
  //                 </a>
  //               </div>
  //             </div>
  //           </div>
  //           {/* <!-- EDUCATION --> */}
  //           <div className='box'>
  //             <h2>
  //               <i className='fas fa-university ico'></i> Education
  //             </h2>
  //             <ul id='education' className='clearfix'>
  //               <li>
  //                 <div className='year pull-left'>2020 2021</div>
  //                 <div className='description pull-right'>
  //                   <h3>General Assembly</h3>
  //                   <div className='where'></div>
  //                   <p>
  //                     <i className='fas fa-graduation-cap ico'></i> Full Stack Web
  //                     Development course
  //                   </p>
  //                   <p>Software Development</p>
  //                   <div>Courses</div>
  //                   <ul className='list-group'>
  //                     <li className='list-group-item'>Flex Immersive</li>
  //                   </ul>
  //                 </div>
  //               </li>
  //             </ul>
  //           </div>
  //           {/* <!-- SKILLS --> */}
  //           <div className='box'>
  //             <h2>
  //               <i className='fas fa-tasks ico'></i> Skills
  //             </h2>
  //             <div className='skills clearfix'>
  //               <div className='item-skills'>
  //                 Web Development
  //                 <span className='skill-level'>Junior</span>
  //               </div>
  //               <div className='col-sm-offset-1 col-sm-12 clearfix'>
  //                 <span className='skill badge'>HTML</span>
  //                 <span className='skill badge'>CSS</span>
  //                 <span className='skill badge'>Javascript</span>
  //                 <span className='skill badge'>Ruby</span>
  //                 <span className='skill badge'>SQL</span>
  //                 <span className='skill badge'>Rest API</span>
  //                 <span className='skill badge'>React</span>
  //                 <span className='skill badge'>Express JS</span>
  //                 <span className='skill badge'>MongoDB</span>
  //                 <span className='skill badge'>Node JS</span>
  //                 <span className='skill badge'>Next JS</span>
  //                 <span className='skill badge'>Gatsby</span>
  //                 <span className='skill badge'>Rails</span>
  //                 <span className='skill badge'>PostgreSQL</span>
  //                 <span className='skill badge'>Material Design</span>
  //               </div>
  //             </div>
  //           </div>
  //           {/* <!-- HOBBIES --> */}
  //           <div className='box'>
  //             <h2>
  //               <i className='fas fa-heart ico'></i> Interests
  //             </h2>
  //             <div className='interests clearfix'>
  //               <div className='item-interests'>Music</div>
  //               <div className='col-sm-offset-1 col-sm-12 clearfix'>
  //                 <span className='interest badge'>Professional musician</span>
  //                 <span className='interest badge'>Drummer</span>
  //                 <span className='interest badge'>Drumming teacher</span>
  //                 <span className='interest badge'>
  //                   Sound engineering and video production
  //                 </span>
  //               </div>
  //             </div>
  //             <div className='interests clearfix'>
  //               <div className='item-interests'>Psychology</div>
  //               <div className='col-sm-offset-1 col-sm-12 clearfix'>
  //                 <span className='interest badge'>Behavioral Psychology</span>
  //                 <span className='interest badge'>Psycho-analysis</span>
  //                 <span className='interest badge'>Cognitive Psychology</span>
  //               </div>
  //             </div>
  //             <div className='interests clearfix'>
  //               <div className='item-interests'>Philosophy</div>
  //               <div className='col-sm-offset-1 col-sm-12 clearfix'>
  //                 <span className='interest badge'>Stoicism</span>
  //                 <span className='interest badge'>Vedic Philosophy</span>
  //                 <span className='interest badge'>Buddhism</span>
  //                 <span className='interest badge'>Zen</span>
  //               </div>
  //             </div>
  //           </div>
  //           <div className='box'>
  //             <h2>
  //               <i className='fas fa-check-square ico'></i> References
  //             </h2>
  //             <blockquote>
  //               <div>Reference...</div>
  //               <footer>
  //                 <a href='' target='_blank'>
  //                   Oleksandr Bilyk
  //                 </a>
  //               </footer>
  //             </blockquote>
  //             <blockquote>
  //               <div>Reference...</div>
  //               <footer>
  //                 <a href='' target='_blank'>
  //                   Dmytro Porfirov
  //                 </a>
  //               </footer>
  //             </blockquote>
  //             <blockquote>
  //               <div>Reference...</div>
  //               <footer>
  //                 <a href='' target='_blank'>
  //                   Adrian Gravelle
  //                 </a>
  //               </footer>
  //             </blockquote>
  //           </div>
  //         </div>
  //       </div>

  //   );
};

export async function getStaticProps({ params }) {
  await dbConnect();

  const resume = await Resume.findById(params.id).lean();
  console.log('resume._id :>> ', resume._id.toString());
  resume._id = resume._id.toString();
  resume.vacancy = resume.vacancy.toString();
  resume.user = resume.user.toString();

  return { props: { resume } };
}
export default PublicCvPage;
