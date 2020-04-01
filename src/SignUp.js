import React from "react";
import Username from "./inputs/Username";
import Password from "./inputs/Password";
import Button from "./inputs/Button";
import SmolLink from "./inputs/SmolLink";
import Error from "./Error";
import {withRouter} from "react-router-dom";
import StrengthMeter from "./StrengthMeter";

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            confirmPassword: "",
            disabled: true
        }
        this.sendRegisterRequest = this.sendRegisterRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event){
        // TODO is it a valid username?
        this.setState({username: event.target.value, error: false})
    }

    handlePasswordChange(event){
        // TODO is password stronk?
        this.setState({password: event.target.value, error: false})
    }

    handleConfirmPasswordChange(event){
        // TODO do passwords match
        this.setState({confirmPassword: event.target.value, error: false})
    }

    sendRegisterRequest(){
        this.setState({disabled: true})
        setTimeout(() => this.setState({disabled: false}), 2000)
        fetch("https://stormy-ridge-49818.herokuapp.com/register", {
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
                    console.log("register successful")
                    this.props.history.push("/index.html");
                } else {
                    throw new Error()
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
                <Username onChange={this.handleUsernameChange} submit={this.sendRegisterRequest}/>
                <Password onChange={this.handlePasswordChange} submit={this.sendRegisterRequest}/>
                <StrengthMeter password={this.state.password} />
                <Password onChange={this.handleConfirmPasswordChange} submit={this.sendRegisterRequest}/>
                <Button text="Sign Up" onClick={this.sendRegisterRequest} disabled={this.state.disabled}/>
                {this.state.error? <Error text={this.state.error} /> : <></>}
                <SmolLink text={"Already have an account?"} to="/index.html"/>
            </div>
        );
    }
}

export default withRouter(SignUp);