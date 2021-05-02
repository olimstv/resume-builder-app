import Head from 'next/head';
import Navbar from './Navbar';
// import styles from '../css/Resume.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Resume Builder App</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
