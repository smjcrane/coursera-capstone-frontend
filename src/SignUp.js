import React from "react";
import Username from "./inputs/Username";
import Password from "./inputs/Password";
import Button from "./inputs/Button";
import SmolLink from "./inputs/SmolLink";
import Error from "./Error";
import {withRouter} from "react-router-dom";
import PhoneNumber from "./inputs/PhoneNumber";
import {PasswordStrength, isStronk} from "./inputs/PasswordStrength";

const usernameRegex = /^[A-Za-z0-9]{3,30}$/

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            confirmPassword: "",
            phone: "",
            alreadyExists: false,
            waiting: false,
        };
        this.sendRegisterRequest = this.sendRegisterRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    buttonIsDisabled(){
        return !this.state.username ||
            !usernameRegex.test(this.state.username) ||
            !this.state.password ||
            !(this.state.password===this.state.confirmPassword) ||
            !isStronk(this.state.password) ||
            this.state.waiting
    }

    handleUsernameChange(event){
        let value = event.target.value;
        this.setState({
            username: value,
        })
    }

    handlePasswordChange(event){
        let value = event.target.value;
        this.setState({
            password: value,
        })
    }

    handlePhoneChange(event){
        this.setState({
            phone: event.target.value,
        })
    }

    handleConfirmPasswordChange(event){
        let value = event.target.value
        this.setState({
            confirmPassword: value,
        })
    }

    sendRegisterRequest(){
        if (this.state.error || this.state.waiting){
            return;
        }
        this.setState({waiting: true})
        setTimeout(() => this.setState({waiting: false}), 2000)
        fetch("https://stormy-ridge-49818.herokuapp.com/register", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                phone: this.state.phone,
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
        return (
            <div>
                <form action="none">
                <Username
                    text="Username (case-sensitive)"
                    onChange={this.handleUsernameChange}
                    submit={this.sendRegisterRequest}/>
                    {this.state.username && !usernameRegex.test(this.state.username) ?
                        <div className="input-field-container">
                            <Error text="Usernames are 3-30 alphanumeric characters"/>
                        </div> : <></> }
                <Password onChange={this.handlePasswordChange} submit={this.sendRegisterRequest}/>
                    {!this.state.password || <PasswordStrength value={this.state.password} />}
                <Password
                    text="Confirm Password"
                    onChange={this.handleConfirmPasswordChange}
                    submit={this.sendRegisterRequest}/>
                    {this.state.password===this.state.confirmPassword || !this.state.confirmPassword ||
                    <div className="input-field-container">
                        <Error text="Passwords do not match" />
                    </div>}
                <PhoneNumber onChange={this.handlePhoneChange} submit={this.sendRegisterRequest} />
                <Button text="Sign Up" onClick={this.sendRegisterRequest} disabled={this.buttonIsDisabled()}/>
                </form>
                {this.state.alreadyExists?
                    <div className="input-field-container">
                        <Error text="User already exists" />
                    </div> : <></>}
                <SmolLink text={"Already have an account?"} to="/index.html"/>
            </div>
        );
    }
}

export default withRouter(SignUp);