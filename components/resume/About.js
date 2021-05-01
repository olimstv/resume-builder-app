const About = ({ resume }) => {
  const summary = resume.basics.summary;

  const work = resume.work;

  return (
    <div className='row'>
      <div className='col-xs-12 col-sm-7'>
        <div className='box'>
          <h2>
            <i className='fas fa-user ico'></i> About
          </h2>
          <p>{summary}</p>
        </div>
        <div className='box'>
          <h2>
            <i className='fas fa-suitcase ico'></i> Work Experience
          </h2>
          {work &&
            work.map(exp => {
              return (
                <div className='job clearfix'>
                  <div className='row'>
                    <div className='details'>
                      <div className='where'></div>
                      <div className='year'>
                        {exp.startDate} -{' '}
                        {!exp.endDate ? `till now` : exp.endDate}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='job-details col-xs-11'>
                      <div className='profession'>{exp.postiton}</div>
                      <div className='description'>
                        {exp.summary}
                        <div className='highlights'>Highlights</div>
                        <ul className='list-group'>
                          {exp.highlights.map(item => {
                            return <li className='list-group-item'>{item}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default About;
