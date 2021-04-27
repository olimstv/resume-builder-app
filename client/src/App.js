import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import './App.css';
import Layout from './components/Layout';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import theme from './themes/theme';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router store={store}>
          <Layout>
            {/* <Alert /> */}
            {/* <Route exact path="/" component={Dashboard} /> */}
            <Switch>
              <Route exact path="/welcome" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
