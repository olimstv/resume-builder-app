import Link from 'next/link';
import * as T from 'prop-types';
import { callApi } from '../util/api';
import { useRouter } from 'next/router';
import { Container, Menu, Image, Header } from 'semantic-ui-react';

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
    <Menu size='large' attached='bottom' activeIndex='3'>
      <Container>

        <Link href='/'>
          <Menu.Item as='a' header><Header color='teal'><Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }}  src='/logo.png' />{`lets.get(IT)`}</Header></Menu.Item>
        </Link>

        {/* Dashboard */}
        {isLoggedIn && (
          <Link href='/dashboard'>
            <Menu.Item >Dashboard</Menu.Item>
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
          <Menu.Item position='right' onClick={handleLogoutClick}>Log Out</Menu.Item>
        ) : (
          <>
            <Link href='/login'>
              <Menu.Item position='right'>Login</Menu.Item>
            </Link>
            <Link href='/signup'>
              <Menu.Item position='right'>Sign Up</Menu.Item>
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
