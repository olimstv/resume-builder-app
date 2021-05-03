const Contact = ({ basics }) => {
  const { email, phone, website, location, profiles } = basics;

  const getProfile = (title, arr) => {
    return arr.filter(el => el.network === title);
  };
  const linkedIn = getProfile('LinkedIn', profiles);
  const gitHub = getProfile('gitHub', profiles);

  // console.log('basics :>> ', basics);
  return (
    <div className='col-xs-12 col-sm-5'>
      <div className='box clearfix'>
        <h2>
          <i className='fas fa-bullseye ico'></i> Contact
        </h2>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fas fa-map-marker fa-fw'></span>
          </div>
          <div className='title only  pull-right'>
            {location.city}, {location.region} {location.countryCode}
          </div>
        </div>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fas fa-phone fa-fw'></span>
          </div>
          <div className='title only pull-right'>{phone}</div>
        </div>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fas fa-envelope fa-fw'></span>

            {/* <FontAwesomeIcon icon={['far', 'envelope']} /> */}
          </div>
          <div className='title only pull-right'>
            <a href={email} target='_blank'>
              {email}
            </a>
          </div>
        </div>
        <div className='contact-item'>
          <div className='icon pull-left text-center'>
            <span className='fab fa-linkedin fa-fw'></span>
            <a href={linkedIn.url}></a>
          </div>
          <div className='title pull-right'>{linkedIn.network}</div>
          <div className='description pull-right'>
            <a href='https://www.linkedin.com/in/olimstv' target='_blank'>
              {linkedIn.username}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
