import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import { CssBaseline, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  guest: {
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(0,0,0, 0.4), rgba(0,0,0,0.4)), url(${
      process.env.PUBLIC_URL + '/assets/landing.jpg'
    })`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    color: '#fff',
  },
  auth: {
    minHeight: '100vh',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  const browserUrl = location.pathname;
  const notAuth = ['/welcome', '/register', '/login'];

  const authLayout = (
    <div className={classes.auth}>
      <CssBaseline />
      <Navbar />

      {children}
    </div>
  );
  const guestLayout = (
    <div className={classes.guest}>
      <CssBaseline />
      <Header />
      {children}
    </div>
  );
  return notAuth.includes(browserUrl) ? guestLayout : authLayout;
};

export default Layout;
