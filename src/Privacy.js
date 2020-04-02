import React from "react";

function Privacy(){
    return (
        <div style={{"padding": "20px"}}>
            <h2>Privacy</h2>
            <h3>Overview</h3>
            <p>This is a simple messaging service.  We store basic information about your account as well as your message history.  We do not share this information with any third parties </p>
            <h3>What data is collected</h3>
            <p>The following information related to you is stored:</p>
            <ul>
                <li>Your username</li>
                <li>The hash of your password</li>
                <li>Your phone number (optionally)</li>
                <li>Your messages to and from other users</li>
            </ul>
            <h3>How your data is used</h3>
            <p>Anyone who knows your username can send you a message.  We will never reveal your username to others, but they may guess it.  We do not currently allow users to block messages from people they don't know.</p>
            <p>Your messages will always be visible to their recipients, but never to other users.</p>
            <p>If you have given us a phone number, you can request password resets via a code which we will text to you.  We will not contact you for any other reason.</p>
            <h3>Remove your data</h3>
            <p>You cannot currently delete your account or messages. </p>
        </div>
    )
}

export default Privacy;