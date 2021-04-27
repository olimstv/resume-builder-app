import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Alert as AlertBanner } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   // position: 'fixed',
  //   height: '100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  alert: { width: '60vw', margin: 5 },
}));

// Takeaways:
// 1. Return earlier
// 2. Do not use simplified syntax, always use {} and return.

const Alert = ({ alerts }) => {
  const classes = useStyles();

  if (!alerts || !alerts.length) {
    return null;
  }

  return alerts.map((alert) => (
    <div key={alert.id} className={classes.root}>
      <AlertBanner
        className={classes.alert}
        variant="filled"
        severity={alert.alertType}
      >
        {alert.msg}
      </AlertBanner>
    </div>
  ));
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
