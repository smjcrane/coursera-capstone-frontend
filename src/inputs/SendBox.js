import React from "react";
import Error from "../Error";
import Button from "./Button";
import "./inputs.css"

const usernameRegex = /^[A-Za-z0-9]{3,30}$/
const messageRegex = /^[A-Za-z0-9 \\\^\-!"£$%&*()#';?.>,<|/`\n€]{1,999}$/

class SendBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            recipient: "",
            contents: "",
            recipientError: false,
            contentsError: false,
            disabled: true,
        }
        this.handleToChange = this.handleToChange.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    handleToChange(event){
        let value = event.target.value;
        if (usernameRegex.test(value)){
            this.setState({
                recipient: value,
                recipientError: false,
                disabled: this.state.contentsError,
            })
        } else {
            this.setState({
                recipient: value,
                recipientError: "Usernames are 3-30 alphanumeric characters",
                disabled: true,
            })
        }
    }

    handleMessageChange(event){
        let value = event.target.value;
        if (messageRegex.test(value)){
            this.setState({
                contents: value,
                contentsError: false,
                disabled: this.state.recipientError,
            })
        } else {
            this.setState({
                contentsError: "Unsupported character",
                disabled: true,
            })
        }
    }

    sendMessage(){
        if (this.state.recipientError || this.state.contentsError || this.state.disabled){
            this.setState({disabled: true})
            return;
        }
        this.setState({disabled: true})
        setTimeout(() => this.setState({disabled: false}), 1000)
        fetch("https://stormy-ridge-49818.herokuapp.com/send", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                to_user: this.state.recipient,
                content: this.state.contents
            })
        }).then((res) => {
            if (res.status === 200) {
                // TODO show success
                this.setState({
                    contents: "",
                    contentError: false,
                })
            } else {
                throw new Error("It didn't like it")
            }
        }).catch(err => {
            // TODO show error
        })
    }

    render(){
        return (
            <div style={{"width": "90%"}}>
                <h2>Send a message</h2>
                <div className="input-field-container">
                    <label htmlFor="recipient">
                        To:
                    </label>
                    <input
                        className="username"
                        name="recipient"
                        placeholder="jim"
                        value={this.state.recipient}
                        onChange={this.handleToChange}
                    />
                </div>
                {this.state.recipientError? <Error text={this.state.recipientError}/> : <></>}
                <div className="message-field-container">
                    <label htmlFor="contents">
                        Message:
                    </label>
                    <textarea
                        className="send-message-contents"
                        name="contents"
                        placeholder="Hello"
                        value={this.state.contents}
                        onChange={this.handleMessageChange}
                    />
                    {this.state.contentsError? <Error text={this.state.contentsError}/> : <></>}
                </div>
                <Button text="Send" onClick={this.sendMessage} disabled={this.state.disabled}/>
            </div>
        )
    }
}

export default SendBox