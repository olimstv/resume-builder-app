const Interests = ({ interests }) => {
  return (
    <div className='box'>
      <h2>
        <i className='fas fa-heart ico'></i> Interests
      </h2>
      {interests.map((interest, index) => {
        return (
          <div key={index} className='interests clearfix'>
            <div className='item-interests'>{interest.name}</div>
            <div className='col-sm-offset-1 col-sm-12 clearfix'>
              {interest.keywords &&
                interest.keywords.map((keyword, index) => {
                  return (
                    <span key={index} className='interest badge'>
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

export default Interests;
