import React from "react";

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
            .catch(err => {
                console.log(err)
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
                <h2>Hello {this.state.username}</h2>
                <p>{text}</p>
            </div>
        );
    }
}

export default Inbox;