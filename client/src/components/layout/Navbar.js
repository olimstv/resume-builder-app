import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as Go } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  links: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Fragment className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Go to="/" className={classes.title}>
            <Typography variant="h6" align="center">
              Resume Builder
            </Typography>
          </Go>
          {/* <Go to="/register" className={classes.links}>
            <Button color="inherit">Register </Button>
          </Go> */}
          <Go to="/login" className={classes.links}>
            <Button color="inherit">Log Out</Button>
          </Go>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
