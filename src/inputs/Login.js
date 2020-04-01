import React from "react";
import Username from "./Username";
import Password from "./Password";
import Button from "./Button";
import SmolLink from "./SmolLink";
import Error from "../Error";
import {withRouter} from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            attempts: [],
            error: false,
            disabled: false
        }
        this.sendLogInRequest = this.sendLogInRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value})
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }

    sendLogInRequest(){
        this.setState({disabled: true})
        setTimeout(() => this.setState({disabled: false}), 2000)
        fetch("https://stormy-ridge-49818.herokuapp.com/auth", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => {
                if (res.status === 200){
                    console.log("log in successful")
                    this.props.history.push("/inbox");
                } else {
                    var e = "An error occurred"
                    if (res.status === 401){
                        e = "Incorrect username or password"
                    }
                    console.log(e)
                    this.setState({
                        attempts: [...this.state.attempts, new Date().getTime()],
                        error: e
                    })
                }
            })
            .catch(() => {
                this.setState({
                    attempts: [...this.state.attempts, new Date().getTime()],
                    error: "An error occurred"
                })
            })
    }

    render() {
        return (
            <div>
                <Username onChange={this.handleUsernameChange} submit={this.sendLogInRequest}/>
                <Password onChange={this.handlePasswordChange} submit={this.sendLogInRequest}/>
                <Button text="Log in" onClick={this.sendLogInRequest} disabled={this.state.disabled}/>
                {this.state.error? <Error text={this.state.error} /> : <></>}
                <SmolLink text={"Sign up for an account"}/>
                <SmolLink text={"Forgot password?"}/>
            </div>
        );
    }
}

export default withRouter(Login);