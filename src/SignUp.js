import React from "react";
import Username from "./inputs/Username";
import Password from "./inputs/Password";
import Button from "./inputs/Button";
import SmolLink from "./inputs/SmolLink";
import Error from "./Error";
import {withRouter} from "react-router-dom";
import StrengthMeter from "./StrengthMeter";

const usernameRegex = /^[A-Za-z0-9]{3,30}$/

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            confirmPassword: "",
            usernameAllowed: false,
            passwordsMatch: false,
            disabled: true,
            alreadyExists: false,
        }
        this.sendRegisterRequest = this.sendRegisterRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    }

    handleUsernameChange(event){
        let value = event.target.value;
        let allowed = usernameRegex.test(value);
        this.setState({
            username: value,
            usernameAllowed: allowed,
            disabled: !this.state.passwordsMatch ||  !allowed
        })
    }

    handlePasswordChange(event){
        // TODO disable if password is not stronk
        let value = event.target.value
        let passMatch = value === this.state.confirmPassword
        this.setState({
            password: value,
            passwordsMatch: passMatch,
            disabled: !passMatch || !this.state.usernameAllowed
        })
    }

    handleConfirmPasswordChange(event){
        let value = event.target.value
        let passMatch = value === this.state.password;
        this.setState({
            confirmPassword: value,
            passwordsMatch: passMatch,
            disabled: !passMatch || !this.state.usernameAllowed
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
                    // TODO show some success thing
                    console.log("register successful")
                    this.props.history.push("/index.html");
                } else if (res.status === 409){
                    this.setState({alreadyExists:true})
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
        let e = false;
        if (!this.state.usernameAllowed && this.state.username){
            e = "Usernames are 3-30 alphanumeric characters"
        } else if (!this.state.passwordsMatch && this.state.confirmPassword){
            e = "Passwords do not match"
        } else if (this.state.alreadyExists){
            e = "User already exists"
        }
        return (
            <div>
                <form action="none">
                <Username onChange={this.handleUsernameChange} submit={this.sendRegisterRequest}/>
                <Password onChange={this.handlePasswordChange} submit={this.sendRegisterRequest}/>
                <StrengthMeter password={this.state.password} />
                <Password onChange={this.handleConfirmPasswordChange} submit={this.sendRegisterRequest}/>
                <Button text="Sign Up" onClick={this.sendRegisterRequest} disabled={this.state.disabled}/>
                </form>
                {e? <Error text={e} /> : <></>}
                <SmolLink text={"Already have an account?"} to="/index.html"/>
            </div>
        );
    }
}

export default withRouter(SignUp);