import React from "react"

function Message(props) {
    return (
        <p key={props.timestamp+props.username+props.content}>
            <span className="speaker">{props.from}</span>
            <span className="verb"> says </span>
            <span className="message-contents">{props.content}</span>
        </p>
    );
}

export default Message