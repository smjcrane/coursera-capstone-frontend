import React from "react";
import Password from "./inputs/Password";
import {isStronk, PasswordStrength} from "./inputs/PasswordStrength";
import PhoneNumber from "./inputs/PhoneNumber";
import Button from "./inputs/Button";
import Error from "./Error";

const phoneRegex = /^[+][0-9]{10,15}$/

class Settings extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: "none",
            oldPassword: "",
            auth: false,
            authError: false,
            authDisabled: true,
            password: "",
            confirmPassword: "",
            passwordsMatch: true,
            passwordDisabled: true,
            passwordError: false,
            phone: "",
            phoneDisabled: true,
            phoneError: false,
        }
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.auth = this.auth.bind(this);
        this.sendChangePasswordRequest = this.sendChangePasswordRequest.bind(this);
        this.sendChangePhoneRequest = this.sendChangePhoneRequest.bind(this);
    }

    handleOldPasswordChange(event){
        if (this.state.auth){
            return
        }
        let value = event.target.value;
        this.setState({
            oldPassword: value,
            authDisabled: !value,
            authError: false,
        }, ()=>{console.log(this.state)})
    }

    handlePasswordChange(event){
        let value = event.target.value;
        this.setState({
            password: value,
            passwordDisabled: (value !== this.state.confirmPassword) || !isStronk(value),
            passwordError: false,
        })
    }

    handlePhoneChange(event){
        this.setState({
            phone: event.target.value,
            phoneDisabled: !phoneRegex.test(event.target.value),
            phoneError: false,
        })
    }

    handleConfirmPasswordChange(event){
        let value = event.target.value
        this.setState({
            confirmPassword: value,
            passwordDisabled: (value !== this.state.password) || !isStronk(value),
            passwordError: false,
        })
    }

    auth(){
        this.setState({authDisabled: true})
        fetch("https://stormy-ridge-49818.herokuapp.com/auth", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: this.state.oldPassword,
            })
        })
            .then(res => {
                if (res.status === 200){
                    this.setState({auth: true, authError: false})
                    // TODO get current phone number
                } else {
                    let e = "An error occurred"
                    if (res.status === 401){
                        e = "Incorrect username or password"
                    }
                    console.log(e)
                    this.setState({
                        authError: e,
                        authDisabled: false,
                    })
                }
            })
            .catch(() => {
                this.setState({
                    authError: "An error occurred",
                    authDisabled: false,
                })
            })
    }

    sendChangePasswordRequest(){
        if (this.state.passwordDisabled){
            return;
        }
        this.setState({passwordDisabled: true})
        fetch("https://stormy-ridge-49818.herokuapp.com/reset", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                oldPassword: this.state.oldPassword,
                newPassword: this.state.password,
            })
        })
            .then(res => {
                if (res.status === 200){
                    // TODO show some success thing
                    this.setState({
                        oldPassword: this.state.password,
                        password: "",
                        confirmPassword: "",
                    })
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                this.setState({
                    passwordDisabled: false,
                    passwordError: true,
                })
            })
    }

    sendChangePhoneRequest(){
        if (this.state.phoneDisabled){
            return;
        }
        this.setState({phoneDisabled: true})
        fetch("https://stormy-ridge-49818.herokuapp.com/setPhone", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                password: this.state.oldPassword,
                phone: this.state.phone
            })
        })
            .then(res => {
                if (res.status === 200){
                    // TODO show some success thing
                    this.setState({
                        phoneError: false,
                        phoneDisabled: false,
                    })
                } else {
                    throw new Error()
                }
            })
            .catch(() => {
                this.setState({
                    phoneError: true,
                })
            })
    }

    render(){
        return(<>
            <h1>Settings</h1>
            {this.state.auth || <>
                <Password text="Current Password" submit={this.auth} value={this.state.oldPassword} onChange={this.handleOldPasswordChange}/>
                {!this.state.authError || <Error text={this.state.authError} />}
                <Button text="Confirm" onClick={this.auth} disabled={this.state.authDisabled}/>
            </>}
            {!this.state.auth || (<>
                <h2>Change Password</h2>
                <Password text="New Password" onChange={this.handlePasswordChange}/>
                {!this.state.password || <PasswordStrength value={this.state.password}/> }
                <Password text="Confirm Password" onChange={this.handleConfirmPasswordChange} submit={this.sendChangePasswordRequest}/>
                {(this.state.password === this.state.confirmPassword) || <Error text={"Passwords do not match"}/>}
                <Button text="Change password" disabled={this.state.passwordDisabled} onClick={this.sendChangePasswordRequest}/>
                {!this.state.passwordError || <Error text={"Error updating password"}/>}
                <h2>Password Recovery</h2>
                <PhoneNumber text="Phone number (include country code)" onChange={this.handlePhoneChange} submit={this.sendChangePhoneRequest}/>
                <Button text="Change phone number" disabled={this.state.phoneDisabled} onClick={this.sendChangePhoneRequest}/>
                {!this.state.phoneError || <Error text={"Error updating phone number"} />}
            </>)}
            </>)
    }
}

export default Settings