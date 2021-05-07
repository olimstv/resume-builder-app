import {Button, Container, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import React, {useState} from "react";
import withSession, {extractReqResFromArgs, useUserServerSide} from "../util/session";
import fetch from 'unfetch';
import {callApi} from "../util/api";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignupPage(props) {

    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastSignupError, setLastSignupError] = useState(undefined);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignupFormSubmit = async (e) => {
        const {isSuccess, errorMessage} = await callApi('/signup', {email, password, firstName, lastName});

        if (isSuccess) {
            router.push('/login');
        } else {
            setLastSignupError(errorMessage);
        }
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    {/*<Image src='/logo.png' />*/} Sign Up
                </Header>

                <Form size='large' onSubmit={handleSignupFormSubmit}>

                    <Segment stacked>
                        <Form.Field>
                            <label htmlFor="firstName">First Name:</label>
                            <input name="firstName" type="text" value={firstName} onChange={handleFirstNameChange} tabIndex={1}/>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="lastName">Last Name:</label>
                            <input name="lastName" type="text" value={lastName} onChange={handleLastNameChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="email">Email:</label>
                            <input name="email" type="text" value={email} onChange={handleEmailChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="password">Password:</label>
                            <input name='password' type="password" value={password} onChange={handlePasswordChange}/>
                        </Form.Field>

                        {lastSignupError && (
                            <Message negative>
                                <Message.Header>Error</Message.Header>
                                <p>{lastSignupError}</p>
                            </Message>
                        )}

                        <Button type='submit'>Sign Up</Button>
                    </Segment>

                </Form>

                <Message>
                    Have an account? <Link href='/login'><a>Login</a></Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

// export async function getServerSideProps(context) {
export const getServerSideProps = withSession(async function (...args) {

    const {req, res} = extractReqResFromArgs(args);

    const {isLoggedIn} = useUserServerSide(req);
    if (isLoggedIn) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: {}
    }
});