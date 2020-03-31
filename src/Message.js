import React from "react"

function Message(props) {
    var s = props.username + " says " + props.content;
    return <p key={props.timestamp+props.username+props.content}>{s}</p>
}

export default Message