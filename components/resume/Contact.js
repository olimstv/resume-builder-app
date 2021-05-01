const Contact = () => {
  return (
    <div class='col-xs-12 col-sm-5'>
      <div class='box clearfix'>
        <h2>
          <i class='fas fa-bullseye ico'></i> Contact
        </h2>
        <div class='contact-item'>
          <div class='icon pull-left text-center'>
            <span class='fas fa-map-marker fa-fw'></span>
          </div>
          <div class='title only  pull-right'>Adelaide, SA AU</div>
        </div>
        <div class='contact-item'>
          <div class='icon pull-left text-center'>
            <span class='fas fa-phone fa-fw'></span>
          </div>
          <div class='title only pull-right'>+61 410 256 252</div>
        </div>
        <div class='contact-item'>
          <div class='icon pull-left text-center'>
            <span class='fas fa-envelope fa-fw'></span>
          </div>
          <div class='title only pull-right'>
            <a href='mailto:oleksii.mostovyi@gmail.com' target='_blank'>
              oleksii.mostovyi@gmail.com
            </a>
          </div>
        </div>
        <div class='contact-item'>
          <div class='icon pull-left text-center'>
            <span class='fab fa-linkedin fa-fw'></span>
          </div>
          <div class='title pull-right'>LinkedIn</div>
          <div class='description pull-right'>
            <a
              href='https:&#x2F;&#x2F;www.linkedin.com&#x2F;in&#x2F;olimstv&#x2F;'
              target='_blank'
            >
              olimstv
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
