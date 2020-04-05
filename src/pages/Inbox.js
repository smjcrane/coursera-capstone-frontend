import React from "react";
import Message from "../Message"
import Menu from "../Menu";
import {withRouter} from "react-router-dom";
import SendBox from "../inputs/SendBox";

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Loading...",
            messages: []
        };
        this.getMessages = this.getMessages.bind(this)
    }

    getMessages(){
        return fetch("https://stormy-ridge-49818.herokuapp.com/messages", {credentials: "include"})
        .then(resm => resm.json())
            .then(datam => {
                this.setState({messages: datam});
                this.el.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(err => {
                console.log("Error getting messages");
                this.setState({
                    messages: []
                })
            })
    }

    componentDidMount() {
        fetch("https://stormy-ridge-49818.herokuapp.com/whoami", {credentials: "include"})
            .then(res => res.json())
            .then(data => {
                if (data.username === "none"){
                    throw new Error()
                }
                this.setState({username: data.username})
            })
            .then(() => this.getMessages())
            .catch(err => {
                this.props.history.push("/index.html")
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
            <>
                <Menu />
                <h2>Welcome, {this.state.username}</h2>
                <p style={{"margin": "0px"}}>{text}</p>
                <a className="smol-link" onClick={this.getMessages}>Refresh</a>
                <div className="message-list-container">
                <ul>
                    {this.state.messages.map(Message)}
                </ul>
                    <div ref={el => { this.el = el; }} />
                </div>
                <SendBox />
                </>
        );
    }
}

export default withRouter(Inbox);