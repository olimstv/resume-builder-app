import moment from 'moment'
const Volunteer = ({ subprofile }) => {
  const { volunteer } = subprofile;
  return (
    <div className='box'>
      <h2>
        <i className='fas fa-users ico'></i> Volunteer
      </h2>
      {volunteer.map((exp, index) => {
        return (
          <div key={index} className='job clearfix'>
            <div className='row'>
              <div className='details'>
                <div className='where'>{exp.organization}</div>
                <div className='year'>
                {moment(exp.startDate).format('DD-MM-YYYY')} - {!exp.endDate ? `till now` : moment(exp.endDate).format('DD-MM-YYYY')}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='job-details col-xs-11'>
                <div className='profession'>{exp.position}</div>
                <div className='description'>{exp.summary}</div>
              </div>
              <div className='highlights'>Highlights</div>
              <ul className='list-group'>
                {exp.highlights.map((item, index) => {
                  return (
                    <li key={index} className='list-group-item'>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Volunteer;
