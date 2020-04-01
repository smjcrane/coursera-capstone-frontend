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
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    }

    handleUsernameChange(event){
        // TODO is it a valid username?
        this.setState({username: event.target.value, error: false})
    }

    handlePasswordChange(event){
        // TODO disable if password is not stronk
        this.setState({
            password: event.target.value,
            error: false,
            disabled: this.state.confirmPassword !== event.target.value,
        })
    }

    handleConfirmPasswordChange(event){
        this.setState({
            confirmPassword: event.target.value,
            error: false,
            disabled: this.state.password !== event.target.value,
        })
    }

    sendRegisterRequest(){
        if (this.state.error || this.state.disabled){
            return;
        }
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
                    this.props.history.push("/inbox");
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                this.setState({
                    error: "An error occurred"
                })
            })
    }

    render() {
        return (
            <div>
                <form action="none">
                <Username onChange={this.handleUsernameChange} submit={this.sendRegisterRequest}/>
                <Password onChange={this.handlePasswordChange} submit={this.sendRegisterRequest}/>
                <StrengthMeter password={this.state.password} />
                <Password onChange={this.handleConfirmPasswordChange} submit={this.sendRegisterRequest}/>
                <Button text="Sign Up" onClick={this.sendRegisterRequest} disabled={this.state.disabled}/>
                </form>
                {this.state.error? <Error text={this.state.error} /> : <></>}
                <SmolLink text={"Already have an account?"} to="/index.html"/>
            </div>
        );
    }
}

export default withRouter(SignUp);