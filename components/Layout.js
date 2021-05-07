import Head from 'next/head';
import Navbar from './Navbar';
import {Container} from "semantic-ui-react";
// import styles from '../css/Resume.module.css';

const Layout = ({children, user}) => {
    return (
        <>
            <Head>
                <title>Resume Builder App</title>
            </Head>
            <Navbar user={user}/>
            <Container>
                {children}
            </Container>
        </>
    );
};

export default Layout;
