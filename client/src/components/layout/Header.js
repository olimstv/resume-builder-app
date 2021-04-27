import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import SortIcon from '@material-ui/icons/Sort';

import { CssBaseline, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '80vw',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  appbar: {
    //marginTop: theme.spacing(1),
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Link: {
    textDecorationLine: 'none',
    '&:hover': {
      textDecoration: 'none !important',
    },
  },
  icon: {
    // color: customTheme.palette.text.primary,
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: 'orange',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />

      <AppBar position="relative" className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <Link href="/welcome">
            {' '}
            <Typography variant="h4" className={classes.appbarTitle}>
              Let's Get <span className={classes.colorText}>It</span>
            </Typography>
          </Link>
          {/* <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
