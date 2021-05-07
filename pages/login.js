import {Button, Container, Form, Header, Message} from "semantic-ui-react";
import React, {useState} from "react";
import withSession, {useUserServerSide} from "../util/session";
import fetch from 'unfetch';
import {callApi} from "../util/api";
import { useRouter } from 'next/router';

export default function LoginPage(props) {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastAuthenticationError, setLastAuthenticationError] = useState(undefined);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLoginFormSubmit = async (e) => {
        const {isSuccess, errorMessage} = await callApi('/login', {email, password});

        if (isSuccess) {
            router.push('/dashboard');
        } else {
            setLastAuthenticationError(errorMessage);
        }
    }

    return (
        <Container>
            <Header as='h2'>Login</Header>

            <Form onSubmit={handleLoginFormSubmit}>

                <Form.Field>
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="text" value={email} onChange={handleEmailChange} tabIndex={1}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password:</label>
                    <input name='password' type="password" value={password} onChange={handlePasswordChange}/>
                </Form.Field>

                {lastAuthenticationError && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{lastAuthenticationError}</p>
                    </Message>
                )}

                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    );
}

// export async function getServerSideProps(context) {
export const getServerSideProps = withSession(async function (req, res) {

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