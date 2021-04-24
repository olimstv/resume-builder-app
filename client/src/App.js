import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Typography from '@material-ui/core/Typography';

import './App.css';
import Layout from './components/Layout';
import Landing from './components/layout/Landing';
import { Container } from '@material-ui/core';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Dashboard } from '@material-ui/icons';

const App = () => (
  <Router>
    <Fragment>
      <Layout>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Container>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/profile" component={ Profile}/> */}
          </Switch>
        </Container>
      </Layout>
    </Fragment>
  </Router>
);

export default App;
