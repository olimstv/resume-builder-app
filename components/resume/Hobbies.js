const Hobbies = () => {
  return (
    <div class='box'>
      <h2>
        <i class='fas fa-heart ico'></i> Interests
      </h2>
      <div class='interests clearfix'>
        <div class='item-interests'>Music</div>
        <div class='col-sm-offset-1 col-sm-12 clearfix'>
          <span class='interest badge'>Professional musician</span>
          <span class='interest badge'>Drummer</span>
          <span class='interest badge'>Drumming teacher</span>
          <span class='interest badge'>
            Sound engineering and video production
          </span>
        </div>
      </div>
      <div class='interests clearfix'>
        <div class='item-interests'>Psychology</div>
        <div class='col-sm-offset-1 col-sm-12 clearfix'>
          <span class='interest badge'>Behavioral Psychology</span>
          <span class='interest badge'>Psycho-analysis</span>
          <span class='interest badge'>Cognitive Psychology</span>
        </div>
      </div>
      <div class='interests clearfix'>
        <div class='item-interests'>Philosophy</div>
        <div class='col-sm-offset-1 col-sm-12 clearfix'>
          <span class='interest badge'>Stoicism</span>
          <span class='interest badge'>Vedic Philosophy</span>
          <span class='interest badge'>Buddhism</span>
          <span class='interest badge'>Zen</span>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
