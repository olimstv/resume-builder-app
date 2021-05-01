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
