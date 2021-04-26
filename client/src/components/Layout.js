import { CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';
import Header from './layout/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    backgroundImage: `linear-gradient(rgba(0,0,0, 0.4), rgba(0,0,0,0.4)), url(${
      process.env.PUBLIC_URL + '/assets/landing.jpg'
    })`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    color: '#fff',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    // <div>
    <div className={classes.root}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
