import React from "react";
import Password from "../inputs/Password";
import { isStronk, PasswordStrength } from "../inputs/PasswordStrength";
import PhoneNumber from "../inputs/PhoneNumber";
import Button from "../inputs/Button";
import Error from "../inputs/Error";
import SmolLink from "../inputs/SmolLink";

const phoneRegex = /^[+][0-9]{10,15}$/

class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            passwordMessage: false,
            phone: "",
            phoneDisabled: true,
            phoneError: false,
            phoneMessage: false,
        }
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.auth = this.auth.bind(this);
        this.sendChangePasswordRequest = this.sendChangePasswordRequest.bind(this);
        this.sendChangePhoneRequest = this.sendChangePhoneRequest.bind(this);
        this.getPhone = this.getPhone.bind(this);
    }

    getPhone() {
        let that = this;
        window.grecaptcha.execute('6LfK6-YUAAAAAAMeD2eJabGWBPfDogVGKWpLXItJ', { action: 'homepage' }).then(function (token) {
            fetch("https://stormy-ridge-49818.herokuapp.com/getphone", {
                method: "post",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: that.state.oldPassword,
                })
            }).then(res => res.json())
                .then(data => {
                    that.setState({ phone: data.phone })
                })
                .catch(err => { /*TODO*/ })
        })
    }

    handleOldPasswordChange(event) {
        if (this.state.auth) {
            return
        }
        let value = event.target.value;
        this.setState({
            oldPassword: value,
            authDisabled: !value,
            authError: false,
        })
    }

    handlePasswordChange(event) {
        let value = event.target.value;
        this.setState({
            password: value,
            passwordDisabled: (value !== this.state.confirmPassword) || !isStronk(value),
            passwordError: false,
            passwordMessage: false,
        })
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.target.value,
            phoneDisabled: !phoneRegex.test(event.target.value),
            phoneError: false,
            phoneMessage: false,
        })
    }

    handleConfirmPasswordChange(event) {
        let value = event.target.value
        this.setState({
            confirmPassword: value,
            passwordDisabled: (value !== this.state.password) || !isStronk(value),
            passwordError: false,
            passwordMessage: false,
        })
    }

    auth() {
        let that = this;
        this.setState({ authDisabled: true });
        window.grecaptcha.execute('6LfK6-YUAAAAAAMeD2eJabGWBPfDogVGKWpLXItJ', { action: 'homepage' }).then(function (token) {
            fetch("https://stormy-ridge-49818.herokuapp.com/auth", {
                method: "post",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: that.state.oldPassword,
                    token: token,
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        that.setState({ auth: true, authError: false });
                        that.getPhone();
                    } else {
                        let e = "An error occurred";
                        if (res.status === 401) {
                            e = "Incorrect username or password"
                        }
                        console.log(e);
                        that.setState({
                            authError: e,
                            authDisabled: false,
                        })
                    }
                })
                .catch(() => {
                    that.setState({
                        authError: "An error occurred",
                        authDisabled: false,
                    })
                })
        })
    }

    sendChangePasswordRequest() {
        if (this.state.passwordDisabled) {
            return;
        }
        this.setState({ passwordDisabled: true })
        let that = this;
        window.grecaptcha.execute('6LfK6-YUAAAAAAMeD2eJabGWBPfDogVGKWpLXItJ', { action: 'homepage' }).then(function (token) {
            fetch("https://stormy-ridge-49818.herokuapp.com/reset", {
                method: "post",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword: that.state.oldPassword,
                    newPassword: that.state.password,
                    token: token,
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        // TODO show some success thing
                        that.setState({
                            oldPassword: that.state.password,
                            password: "",
                            confirmPassword: "",
                            passwordMessage: true,
                        })
                    } else {
                        throw new Error()
                    }
                })
                .catch(() => {
                    that.setState({
                        passwordDisabled: false,
                        passwordError: true,
                    })
                })
        })
    }

    sendChangePhoneRequest() {
        if (this.state.phoneDisabled) {
            return;
        }
        this.setState({ phoneDisabled: true })
        let that = this;
        window.grecaptcha.execute('6LfK6-YUAAAAAAMeD2eJabGWBPfDogVGKWpLXItJ', { action: 'homepage' }).then(function (token) {
            fetch("https://stormy-ridge-49818.herokuapp.com/setphone", {
                method: "post",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: that.state.oldPassword,
                    phone: that.state.phone,
                    token: token,
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        // TODO show some success thing
                        that.setState({
                            phoneError: false,
                            phoneDisabled: false,
                            phoneMessage: true,
                        })
                    } else {
                        throw new Error()
                    }
                })
                .catch(() => {
                    that.setState({
                        phoneError: true,
                    })
                })
        })
    }

    render() {
        return (<>
            <div className="menu">
                <SmolLink text="Back to Inbox" to="/inbox" />
            </div>
            <h1>Settings</h1>
            {this.state.auth || <>
                <Password text="Current Password" submit={this.auth} value={this.state.oldPassword} onChange={this.handleOldPasswordChange} />
                {!this.state.authError || <Error text={this.state.authError} />}
                <Button text="Confirm" onClick={this.auth} disabled={this.state.authDisabled} />
            </>}
            {!this.state.auth || (<>
                <h2>Change Password</h2>
                <Password text="New Password" onChange={this.handlePasswordChange} />
                {!this.state.password || <PasswordStrength value={this.state.password} />}
                <Password text="Confirm Password" onChange={this.handleConfirmPasswordChange} submit={this.sendChangePasswordRequest} />
                {(this.state.password === this.state.confirmPassword) || <Error text={"Passwords do not match"} />}
                <Button text="Change password" disabled={this.state.passwordDisabled} onClick={this.sendChangePasswordRequest} />
                {!this.state.passwordError || <Error text={"Error updating password"} />}
                {!this.state.passwordMessage || <p className="success">Success!</p>}
                <h2>Password Recovery</h2>
                <PhoneNumber text="Phone number (include country code)" onChange={this.handlePhoneChange} submit={this.sendChangePhoneRequest} />
                <Button text="Change phone number" disabled={this.state.phoneDisabled} onClick={this.sendChangePhoneRequest} />
                {!this.state.phoneError || <Error text={"Error updating phone number"} />}
                {!this.state.phoneMessage || <p className="success">Success!</p>}
            </>)}
        </>)
    }
}

export default Settings