import { makeStyles } from '@material-ui/core';
import React from 'react';
// import { connect } from 'react-redux';
// import { login } from '../../actions/auth';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';

const useStyles = makeStyles({});
const Dashboard = () => {
  const classes = useStyles();

  // Redirect if not logged in
  // if (!isAuthenticated) {
  //   debugger;
  //   return <Redirect to="/welcome" />;
  // }
  return <div>Dashboard</div>;
};

// Dashboard.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { login })(Dashboard);
export default Dashboard;
