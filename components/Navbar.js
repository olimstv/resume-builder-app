import Link from 'next/link';
import * as T from 'prop-types';
import { callApi } from '../util/api';
import { useRouter } from 'next/router';
import { Container, Menu, Image, Header } from 'semantic-ui-react';
import React, {useState} from 'react'
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
    <Menu borderless pointing secondary size='large' attached='bottom' >
      <Container>

        <Link href='/'>
          <Menu.Item as='a'>
            <Header color='teal'>
              <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} src='/logo.png' />{`lets.get(IT)`}
            </Header>
          </Menu.Item>
        </Link>

        {/* Dashboard */}
        {isLoggedIn && (
          <Link href='/dashboard'>
            <Menu.Item name='dashboard'  >Dashboard</Menu.Item>
          </Link>
        )}

        {/* Profile */}
        {isLoggedIn && (
          <Link href='/profile'>
            <Menu.Item  name='profile' >Profile</Menu.Item>
          </Link>
        )}

        {isLoggedIn && (
          <Link href='/create-resume'>
            <Menu.Item  name='create-resume'>Create Resume</Menu.Item>
          </Link>
        )}

        {isLoggedIn ? (
          <Menu.Item header position='right' onClick={handleLogoutClick}>Log Out</Menu.Item>
        ) : (
          <>
              <Link href='/login'>
                <Menu.Menu position='right'>
                  <Menu.Item >Login</Menu.Item>
                  </Menu.Menu>
            </Link>
              <Link href='/signup'>
              <Menu.Menu position='right'>
                  <Menu.Item  >Sign Up</Menu.Item>
                  </Menu.Menu>
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
