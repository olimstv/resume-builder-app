import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import './App.css';
import Layout from './components/Layout';
import Landing from './components/layout/Landing';
import { Container } from '@material-ui/core';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Dashboard } from '@material-ui/icons';
import theme from './themes/theme';
import Header from './components/layout/Header';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Route exact path="/" component={Dashboard} />
      <Switch>
        <Layout>
          <Route exact path="/welcome" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Layout>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
