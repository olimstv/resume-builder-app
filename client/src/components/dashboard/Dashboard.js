import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading },
  // profile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  console.log('profile: ', profile);
  return profile && loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Typography variant="h3">Dashboard</Typography>
      <Typography variant="h5">
        <PersonIcon fontSize="inherit" />
        Welcome {auth.user.firstName} {auth.user.lastName}
      </Typography>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>has not</Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
