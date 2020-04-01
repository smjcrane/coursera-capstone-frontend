import React from "react";
import Message from "./Message"

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Loading...",
            messages: []
        };
    }

    componentDidMount() {
        fetch("https://stormy-ridge-49818.herokuapp.com/whoami", {credentials: "include"})
            .then(res => res.json())
            .then(data => this.setState({username: data.username}))
            .then(() =>
                fetch("https://stormy-ridge-49818.herokuapp.com/messages", {credentials: "include"})
            )
            .then(resm => resm.json())
            .then(datam => this.setState({messages: datam}))
            .catch(err => {
                window.location.replace("/index.html")
            })
    }


    render() {
        let text="";
        switch (this.state.messages.length) {
            case 0:
                text="You have no messages";
                break;
            case 1:
                text="You have 1 message";
                break;
            default:
                text="You have "+this.state.messages.length+" messages"
        }
        return (
            <div>
                <h2>Welcome, {this.state.username}</h2>
                <p>{text}</p>
                <ul>
                    {this.state.messages.map(Message)}
                </ul>
            </div>
        );
    }
}

export default Inbox;