const Hobbies = ({ interests }) => {
  console.log('interests :>> ', interests);
  return (
    <div class='box'>
      <h2>
        <i class='fas fa-heart ico'></i> Interests
      </h2>
      {interests.map((interest, index) => {
        return (
          <div key={index} class='interests clearfix'>
            <div class='item-interests'>{interest.name}</div>
            <div class='col-sm-offset-1 col-sm-12 clearfix'>
              {interest.keywords.map((keyword, index) => {
                return (
                  <span key={index} class='interest badge'>
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

export default Hobbies;
