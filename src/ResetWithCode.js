import React from "react";
import Username from "./inputs/Username";
import Button from "./inputs/Button";
import Error from "./Error";
import SmolLink from "./inputs/SmolLink";
import Password from "./inputs/Password";
import ResetCode from "./inputs/ResetCode";
import {
    withRouter,
} from "react-router-dom";
import {PasswordStrength, isStronk} from "./inputs/PasswordStrength";

class ResetWithCode extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            confirmPassword: "",
            passwordsMatch: true,
            passwordStronk: false,
            resetcode: "",
            disabled: true,
        }
        this.sendResetRequest = this.sendResetRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleResetCodeChange = this.handleResetCodeChange.bind(this);
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value,
            disabled: !(this.state.password === this.state.confirmPassword) || !this.state.resetcode || !this.state.username || !this.state.passwordStronk
        })
    }

    handleResetCodeChange(event){
        this.setState({
            resetcode: event.target.value
        })
    }

    handlePasswordChange(event){
        let value = event.target.value
        let passMatch = value === this.state.confirmPassword
        let isPassStronk = isStronk(value)
        this.setState({
            password: value,
            passwordsMatch: passMatch,
            passwordStronk: isPassStronk,
            disabled: !passMatch || !this.state.resetcode || !this.state.username || !isPassStronk
        })
    }

    handleConfirmPasswordChange(event){
        let value = event.target.value
        let passMatch = value === this.state.password;
        this.setState({
            confirmPassword: value,
            passwordsMatch: passMatch,
            disabled: !passMatch || !this.state.resetcode || !this.state.username || !this.state.passwordStronk
        })
    }

    componentDidMount() {
        this.setState({
            username: new URLSearchParams(window.location.search).get("username"),
        })
    }


    sendResetRequest(){
        this.setState({disabled: true})
        setTimeout(() => this.setState({disabled: false}), 2000)
        fetch("https://stormy-ridge-49818.herokuapp.com/resetwithcode", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                resetcode: this.state.resetcode,
            })
        })
            .then(res => {
                if (res.status === 200){
                    // log in and go to inbox
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
                            if (res.status === 200) {
                                console.log("log in successful")
                                this.props.history.push("/inbox");
                            } else {
                                throw new Error()
                            }
                        })
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
            <>
                <h1>Password Reset</h1>
                <p style={{"width": "90%"}}>Enter the code you were sent by text</p>
                <div>
                    <form action="none">
                        <Username value={this.state.username} onChange={this.handleUsernameChange} submit={this.sendResetRequest}/>
                        <ResetCode value={this.state.resetcode} onChange={this.handleResetCodeChange} submit={this.sendResetRequest}/>
                        <Password value={this.state.password} onChange={this.handlePasswordChange} submit={this.sendResetRequest}/>
                        {!this.state.password || <PasswordStrength value={this.state.password} />}
                        <Password
                            text="Confirm Password"
                            onChange={this.handleConfirmPasswordChange}
                            submit={this.sendResetRequest}/>
                        {this.state.passwordsMatch || (this.state.confirmPassword.length === 0) || <div className="input-field-container">
                                <Error text="Passwords do not match" />
                            </div>}
                        <Button text="Reset Password" onClick={this.sendResetRequest} disabled={this.state.disabled}/>
                    </form>
                    {this.state.error? <div className="input-field-container"> <Error text={this.state.error} /></div> : <></>}
                    <SmolLink text="Back to login" to="/index.html"/>
                </div>
            </>
        );
    }
}

export default withRouter(ResetWithCode);