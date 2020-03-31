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
        return;
        fetch("https://stormy-ridge-49818.herokuapp.com/whoami").then(res => {
            console.log("res", res)
            this.setState({username: res.body})
        }).catch(err => {
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
        //                <h2>{this.state.username}</h2>
        return (
            <div>
                <p>{text}</p>
            </div>
        );
    }
}

export default Inbox;