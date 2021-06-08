<<<<<<< HEAD
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
=======
import 'normalize.css/normalize.css';
import '../css/global.css';

import Layout from '../components/Layout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
>>>>>>> 8daeca45a4b3e4938beb40ab9d7858c91469d38a
