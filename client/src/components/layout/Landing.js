import React from 'react';
import { Card, CardActions, CardContent, Container } from '@material-ui/core';
import { Link as Go } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderRadius: 5,
    // color: theme.palette.text.primary,
    backgroundColor: 'rgba(255, 255, 255, .7)',
    // backgroundColor: 'rgba(38, 38, 38, .3)',
    background: 'none',
  },
  Button: {},
  link: {
    textDecoration: 'none',
  },
}));
// const StyledLink = styled(Go)`
//   text-decoration: none;
// `;

const Landing = () => {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      {/* <Header /> */}
      <Container className={classes.root} maxWidth="lg">
        <Card elevation={0} className={classes.welcome}>
          <CardContent>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h3"
              component="h2"
            >
              Hello
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>

          <CardActions className={classes.buttons}>
            <Go className={classes.link} to="/login">
              <Button variant="contained" size="medium" color="primary">
                Log In
              </Button>
            </Go>
            <Go className={classes.link} to="/register">
              <Button variant="contained" size="medium" color="primary">
                Register
              </Button>
            </Go>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
};

export default Landing;
