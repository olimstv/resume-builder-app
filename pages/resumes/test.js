// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// import dbConnect from '../../util/dbConnect';
// import Resume from '../../models/Resume';

// const PublicCvPage = ({ resume }) => {
//   const router = useRouter();
//   const [message, setMessage] = useState('');

//   const { basics, work, volunteer, education, skills } = resume;
//   const {
//     name,
//     label,
//     picture,
//     email,
//     phone,
//     website,
//     summary,
//     location,
//     profiles
//   } = basics;
//   let gitHubArr = profiles.filter(profile => {
//     return profile.network === 'GitHub';
//   });
//   const gitHub = gitHubArr[0];

//   const { address, postalCode, city, countryCode, region } = location;

//   // check
//   console.log('skills :>> ', skills);

//   return (
//     <div>
//       <h1>Public CV Page</h1>

//       <div className='letter'>
//         <section id='save'>
//           <section className='sheet'>
//             <aside>
//               <section className='contact'>
//                 <h6>Contact</h6>
//                 <ul>
//                   <li>
//                     <p>
//                       <i className='fa fa-map-marker-alt' title='Location'></i>{' '}
//                       {city}
//                     </p>
//                   </li>
//                   <li>
//                     <p>
//                       <i className='fa fa-phone' title='Cell phone'></i>{' '}
//                       <a href='tel:4153234000'>{phone}</a>
//                     </p>
//                   </li>
//                   <li>
//                     <p>
//                       <i className='fa fa-envelope' title='Email'></i>{' '}
//                       <a href={email}>{email}</a>
//                     </p>
//                   </li>
//                   <li>
//                     <p>
//                       <i className='fa fa-globe-americas' title='Website'></i>{' '}
//                       <a href={website}>{website}</a>
//                     </p>
//                   </li>
//                   {gitHub && (
//                     <li>
//                       <p>
//                         <i className='fa fa-globe-americas' title='GitHub'></i>{' '}
//                         <a href={gitHub.url}>{gitHub.url}</a>
//                       </p>
//                     </li>
//                   )}
//                 </ul>
//               </section>
//               <section className='skills'>
//                 <h6>Skills</h6>
//                 {slikks && (
//                   <ul>
//                     {skills.map(skill => {
//                       <li key={skill.name}>
//                         <span>{skill.name}</span>
//                       </li>;
//                     })}
//                     <li>
//                       <span>Responsive Design</span>
//                     </li>
//                     <li>
//                       <span>Mobile Development</span>
//                     </li>
//                     <li>
//                       <span>Usability Testing</span>
//                     </li>
//                     <li>
//                       <span>Data Visualization</span>
//                     </li>
//                     <li>
//                       <span>A/B Testing</span>
//                     </li>
//                   </ul>
//                 )}
//               </section>
//               <section className='skills'>
//                 <h6>Technologies</h6>
//                 <ul>
//                   <li>
//                     <span>JavaScript</span>
//                   </li>
//                   <li>
//                     <span>PHP</span>
//                   </li>
//                   <li>
//                     <span>HTML5</span>
//                   </li>
//                   <li>
//                     <span>CSS3</span>
//                   </li>
//                   <li>
//                     <span>Bootstrap</span>
//                   </li>
//                   <li>
//                     <span>React</span>
//                   </li>
//                 </ul>
//               </section>
//               <section className='references'>
//                 <h6>References</h6>
//                 <address>
//                   Jane Doe
//                   <br />
//                   Alphabet Inc.
//                   <br />
//                   (413) 025-1900 jane@janedoe.site
//                 </address>
//                 <address>
//                   Luke O'Connor
//                   <br />
//                   Facebook
//                   <br />
//                   (413) 125-1400 luke@facebook.site
//                 </address>
//                 <p>
//                   Typeset in HTML &amp; CSS
//                   <br />
//                   See <a href='https://git.io/f4dXp'>git.io/f4dXp</a>
//                 </p>
//               </section>
//             </aside>
//             <section>
//               <header className='name' aria-label='Joe Smith'>
//                 <a href='https://joesmith.site'>JOE SMITH</a>
//                 <h6>Software Engineer Extraordinaire</h6>
//                 <hr />
//               </header>
//               <section>
//                 <section className='summary'>
//                   <h6>Summary</h6>
//                   <p>
//                     Deadline-oriented software engineer with lots of experience.
//                     Solid track record of architecting solutions that exceed
//                     client expectations.
//                   </p>
//                 </section>
//                 <section className='experience'>
//                   <h6>Experience</h6>
//                   <ol>
//                     <li>
//                       <header>
//                         <p className='sanserif'>Senior Software Engineer</p>
//                         <time>2016 – Present</time>
//                       </header>
//                       <span>Google</span>
//                       <ul>
//                         <li>Developed scalable database indexing technology</li>
//                         <li>Created GraphQL APIs for accessing Google Earth</li>
//                         <li>
//                           Leveraged Waymo datasets to double traffic statistics
//                           accuracy
//                         </li>
//                       </ul>
//                     </li>
//                     <li>
//                       <header>
//                         <p className='sanserif'>Software Engineer</p>
//                         <time>2014 – 2016</time>
//                       </header>
//                       <span>Facebook</span>
//                       <ul>
//                         <li>
//                           Collected political affiliation data from millions of
//                           users
//                         </li>
//                         <li>Authored user stories and mapped user journeys</li>
//                         <li>
//                           Introduced regression testing to Yoga layout framework
//                         </li>
//                       </ul>
//                     </li>
//                     <li>
//                       <header>
//                         <p className='sanserif'>Software Engineer Intern</p>
//                         <time>2013 – 2014</time>
//                       </header>
//                       <span>Twitter</span>
//                       <ul>
//                         <li>
//                           Analyzed and optimized code coverage across Scala
//                           architecture
//                         </li>
//                         <li>Created project environment setup XML files</li>
//                         <li>
//                           Maintained TCP/IP connections with 250,000 concurrent
//                           users
//                         </li>
//                       </ul>
//                     </li>
//                     <li>
//                       <header>
//                         <p className='sanserif'>Independent iOS Engineer</p>
//                         <time>2012 – Present</time>
//                       </header>
//                       <ul>
//                         <li>
//                           Developed SuperUltraCoolWeather app using AccuWeather
//                           API
//                         </li>
//                         <li>
//                           Shipped products to more than 1,000,000 daily active
//                           users
//                         </li>
//                       </ul>
//                     </li>
//                   </ol>
//                 </section>
//                 <section className='education'>
//                   <h6>Education</h6>
//                   <ol>
//                     <li>
//                       <div>
//                         <p className='sanserif'>
//                           M.S., Human Computer Interaction
//                         </p>
//                         <time>Sept '12 – May '14</time>
//                       </div>
//                       <div>
//                         <span>Massachusetts Institute of Technology</span>
//                         <span></span>
//                       </div>
//                     </li>
//                     <li>
//                       <div>
//                         <p className='sanserif'>B.S., Computer Science</p>
//                         <time>Sept '08 – May '12</time>
//                       </div>
//                       <div>
//                         <span>Harvard University</span>
//                         <span>GPA: 3.91</span>
//                       </div>
//                     </li>
//                   </ol>
//                 </section>
//               </section>
//             </section>
//           </section>
//         </section>
//         {/* <!-- Script to make elements authorable and save changes to localStorage -->
//         <script type="text/javascript" src="./index.js"></script> */}
//       </div>
//     </div>
//   );
// };

// export async function getServerSideProps({ params }) {
//   await dbConnect();

//   const resume = await Resume.findById(params.id).lean();
//   console.log('resume._id :>> ', resume._id.toString());
//   resume._id = resume._id.toString();
//   resume.user = resume.user.toString();

//   return { props: { resume } };
// }
// export default PublicCvPage;

export const getStaticProps = async () => {};
