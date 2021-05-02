const Languages = ({ languages }) => {
  return (
    <div className='box'>
      <h2>
        <i className='fas fa-tasks ico'></i> Languages
      </h2>
      {languages.map((language, index) => {
        return (
          <div key={index} className='skills clearfix'>
            <div className='item-skills'>
              {language.language}
              <span className='skill-level'>{language.fluency}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Languages;
