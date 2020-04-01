import React from "react"

function Message(props) {
    return (
        <p key={props.timestamp+props.username+props.content} className="message">
            <span className="speaker">{props.from.toString()}</span>
            <span className="verb"> says </span>
            <span className="message-contents">{props.content.toString()}</span>
        </p>
    );
}

export default Message