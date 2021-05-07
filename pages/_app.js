import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.min.css';
import '../css/global.css';

import Head from "next/head";
import Navbar from "../components/Navbar";

const MyApp = ({Component, pageProps}) => {

    return <>
        <Head>
            <title>Resume Builder App</title>
        </Head>
        <Component {...pageProps} />
    </>;
};

export default MyApp;
