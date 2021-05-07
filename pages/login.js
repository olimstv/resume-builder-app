import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Image
} from 'semantic-ui-react';
import React, { useState } from 'react';
import withSession, {
  extractReqResFromArgs,
  useUserServerSide
} from '../util/session';
import fetch from 'unfetch';
import { callApi } from '../util/api';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage(props) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastAuthenticationError, setLastAuthenticationError] = useState(
    undefined
  );

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = async e => {
    const { isSuccess, errorMessage } = await callApi('/login', {
      email,
      password
    });

    if (isSuccess) {
      router.push('/dashboard');
    } else {
      setLastAuthenticationError(errorMessage);
    }
  };

  return (
    <>
      <style>
        {`
        html, body {
          background: #ddd
          ;
        }
      `}
      </style>
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {/* <Container size='large'> */}
          <Segment stacked>
            <Header as='h1' color='teal' textAlign='center'>
              <Image size='massive' src='/logo.png' />
              lets.get(IT)
            </Header>
            <Header as='h2' color='teal'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={handleLoginFormSubmit}>
              <Form.Field>
                {/* <label htmlFor='email'>Email:</label> */}
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  type='text'
                  value={email}
                  onChange={handleEmailChange}
                  tabIndex={1}
                />
              </Form.Field>
              <Form.Field>
                {/* <label htmlFor='password'>Password:</label> */}
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Field>
              {lastAuthenticationError && (
                <Message negative>
                  <Message.Header>Error</Message.Header>
                  <p>{lastAuthenticationError}</p>
                </Message>
              )}

              <Button color='teal' fluid size='large' type='submit'>
                Login
              </Button>
            </Form>
          </Segment>
          <Segment>
            New to us?{' '}
            <Link href='/signup'>
              <a>Sign Up</a>
            </Link>
          </Segment>
          {/* </Container> */}
        </Grid.Column>
      </Grid>
    </>
  );
}

// export async function getServerSideProps(context) {
export const getServerSideProps = withSession(async function (...args) {
  const { req, res } = extractReqResFromArgs(args);

  const { isLoggedIn } = useUserServerSide(req);
  if (isLoggedIn) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
});
