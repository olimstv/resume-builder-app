import Head from 'next/head';
import Navbar from './Navbar';
import { Container } from 'semantic-ui-react';
import { Fragment } from 'react';
// import styles from '../css/Resume.module.css';

const Layout = ({ children, user }) => {
  return (
    <>
    <style>
        {`
        html, body {
          background: #eee
          ;
        }
        `}
      </style>
        {/* <Container> */}
      <Head>
        <title>Resume Builder App</title>
      </Head>
      <Navbar user={user} />
      <Fragment>{children}</Fragment>
       {/* </Container> */}
    </>
  );
};

export default Layout;
