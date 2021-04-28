import { makeStyles } from '@material-ui/core';
import React from 'react';
import Navbar from '../layout/Navbar';

const useStyles = makeStyles({});
const Dashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
