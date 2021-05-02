import Navbar from './Navbar';
import styles from '../css/Resume.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
