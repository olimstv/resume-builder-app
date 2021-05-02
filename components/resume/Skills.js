const Skills = ({ skills }) => {
  return (
    <div className='box'>
      <h2>
        <i className='fas fa-tasks ico'></i> Skills
      </h2>
      {skills.map(skill => {
        return (
          <div key={skill.name} className='skills clearfix'>
            <div className='item-skills'>
              {skill.name}
              <span className='skill-level'>{skill.level}</span>
            </div>
            <div className='col-sm-offset-1 col-sm-12 clearfix'>
              {skill.keywords.map((keyword, index) => {
                return (
                  <span key={index} className='skill badge'>
                    {keyword}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
