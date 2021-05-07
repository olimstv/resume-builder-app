import React, {useState} from "react";
import Layout from '../components/Layout';
import {Button, Header, Message} from "semantic-ui-react";
//import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import withSession, {extractReqResFromArgs, useUserServerSide} from "../util/session";
import dbConnect from "../util/dbConnect";
import User from "../models/User";

import dynamic from 'next/dynamic';
import { callApi } from "../util/api";

import safeJsonStringify from 'safe-json-stringify';

// react-json-editor-ajrm does not support server-side rendering (SSR),
// therefore we load it dynamically, so that it is only loaded by the client
// and rendered in the client
const JSONInputWithNoSSR = dynamic(
    () => import('react-json-editor-ajrm'),
    { ssr: false }
)

const ProfilePage = ({ user }) => {

    const [profileJsonStr, setProfileJsonStr] = useState(JSON.stringify(user.profile));
    const [lastSaveError, setLastSaveError] = useState(undefined);
    const [lastSuccessSaveDate, setLastSuccessSaveDate] = useState(undefined);

    // undefined if the content's syntax is incorrect.
    const [profileJsonObj, setProfileJsonObj] = useState(user.profile);

    const handleJsonChange = (obj) => {
        setProfileJsonStr(obj.plainText);
        setProfileJsonObj(obj.jsObject); // undefined if the content's syntax is incorrect
    }

    const handleSaveClick = async (e) => {
        const {isSuccess, errorMessage, data} = await callApi('/save-profile-json', {profileJsonObj});

        if (isSuccess) {
            setLastSaveError(undefined);
            setLastSuccessSaveDate(new Date);
        } else {
            setLastSuccessSaveDate(undefined);
            setLastSaveError(errorMessage);
        }
    }

    return <Layout user={user}>
        <Header as='h2'>
            Profile JSON
        </Header>
        <p>
            Input your full profile details in the <a href='https://jsonresume.org/'>JSON Resume</a> format.
        </p>

        <JSONInputWithNoSSR
            id          = 'user_profile_json_editor'
            placeholder = {user.profile} // A valid javascript object to be shown once the component is mounted
            theme      = 'light_mitsuketa_tribute'
            locale      = { locale }
            height      = '60vh'
            onChange    = {handleJsonChange}
            width       = '100%'
        />

        <div>
            <br/>
            {lastSaveError && (
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{lastSaveError}</p>
                </Message>
            )}

            {lastSuccessSaveDate && !lastSaveError ? (
                <Message positive>
                    <Message.Header>Saved</Message.Header>
                    <p>Last saved successfully {lastSuccessSaveDate.toLocaleString()}</p>
                </Message>
            ) : null}

            <Button onClick={handleSaveClick} disabled={!profileJsonObj}>
                Save
            </Button>
        </div>
    </Layout>
}


export const getServerSideProps = withSession(async function (...args) {
    const { req, res } = extractReqResFromArgs(args);
    const { isLoggedIn, user, httpResponse } = useUserServerSide(req);
    if (!isLoggedIn) {
        return httpResponse;
    }

    await dbConnect();

    const rawDbUser = await User.findById(user._id); //.lean();
    const stringifiedDbUser = safeJsonStringify(rawDbUser);
    const dbUser = JSON.parse(stringifiedDbUser);
    dbUser._id = dbUser._id.toString();

    return { props: { user: dbUser } };
});

export default ProfilePage;
