import moment from 'moment'

const Education = ({education}) => {
  // console.log('education :>> ', education);
  return (
    <div className='box'>
      <h2>
        <i className='fas fa-university ico'></i> Education
      </h2>
      <ul id='education' className='clearfix'>
        {education.map((exp, index) => {
          return (
            <li key={index}>
              <div className='year pull-left'>
                {moment(exp.startDate).format('DD-MM-YYYY')} - {!exp.endDate ? `till now` : moment(exp.endDate).format('DD-MM-YYYY')}
              </div>
              <div className='description pull-right'>
                <h3>{exp.institution}</h3>
                <div className='where'></div>
                <p>
                  <i className='fas fa-graduation-cap ico'></i> Full Stack Web
                  Development course
                </p>
                <p>Software Development</p>
                <div>Courses</div>
                <ul className='list-group'>
                  {exp.courses &&
                  exp.courses.map((course, index) => {
                    return (
                      <li key={index} className='list-group-item'>
                        {course}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Education;