// import styles from '../../css/Resume.module.css';
const ResumeHeader = ({ basics }) => {
  const { name, label } = basics;
  // console.log('basics :>> ', basics);
  return (
    <div className='row'>
      <div className='col-xs-12'>
        <div id='photo-header' className='text-center'>
          <div id='photo'>
            {/* <img src="&#x2F;&#x2F;www.gravatar.com&#x2F;avatar&#x2F;9813b0f6ac7585c3a21c2565e6b1be0a?s&#x3D;200&amp;r&#x3D;pg&amp;d&#x3D;mm" alt="avatar"> */}
          </div>

          <div id='text-header'>
            <h1>
              {name}
              <span>{label}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;
