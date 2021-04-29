import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar children={children} />
      {/* {children} */}
    </div>
  );
};

export default Layout;
