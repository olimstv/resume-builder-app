import Link from 'next/link';
import * as T from 'prop-types';
import { callApi } from '../util/api';
import { useRouter } from 'next/router';
import { Container, Menu, Image } from 'semantic-ui-react';

const Navbar = props => {
  const router = useRouter();

  const { user } = props;
  const isLoggedIn = !!user;

  const handleLogoutClick = async e => {
    e.stopPropagation();
    e.preventDefault();

    const { isSuccess, errorMessage } = await callApi('/logout');
    if (isSuccess) {
      // Redirect to Home Page
      await router.push('/');
    } else {
      console.error('An error was thrown by the /logout API: ' + errorMessage);
    }
  };

  return (
    
    <Menu fixed='top'>
          <Container>
        <Link href='/'>
          <Menu.Item as='a' header><Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }}  src='/logo.png' />Let's Get IT</Menu.Item>
        </Link>

        {/* Dashboard */}
        {isLoggedIn && (
          <Link href='/dashboard'>
            <Menu.Item>Dashboard</Menu.Item>
          </Link>
        )}

        {/* Profile */}
        {isLoggedIn && (
          <Link href='/profile'>
            <Menu.Item>Profile</Menu.Item>
          </Link>
        )}

        {isLoggedIn && (
          <Link href='/create-resume'>
            <Menu.Item>Create Resume</Menu.Item>
          </Link>
        )}

        {isLoggedIn ? (
          <Menu.Item onClick={handleLogoutClick}>Log Out</Menu.Item>
        ) : (
          <>
            <Link href='/login'>
              <Menu.Item>Login</Menu.Item>
            </Link>
            <Link href='/signup'>
              <Menu.Item>Sign Up</Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
};

Navbar.propTypes = {
  user: T.any
};

export default Navbar;
