import React from "react";
import Username from "./Username";
import Password from "./Password";
import Button from "./Button";
import SmolLink from "./SmolLink";
import Error from "./Error";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false,
            disabled: false,
        }
        this.sendLogInRequest = this.sendLogInRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value, error: false })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value, error: false })
    }

    sendLogInRequest() {
        let that = this;
        this.setState({ disabled: true, error: false })
        setTimeout(() => this.setState({ disabled: false }), 2000)
        window.grecaptcha.execute('6LfK6-YUAAAAAAMeD2eJabGWBPfDogVGKWpLXItJ', { action: 'homepage' }).then(function (token) {
            fetch("https://stormy-ridge-49818.herokuapp.com/auth", {
                method: "post",
                credentials: "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: that.state.username,
                    password: that.state.password,
                    token: token,
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        console.log("log in successful")
                        that.props.history.push("/inbox");
                    } else {
                        var e = "An error occurred"
                        if (res.status === 401) {
                            e = "Incorrect username or password"
                        }
                        console.log(e)
                        that.setState({
                            error: e
                        })
                    }
                })
                .catch(() => {
                    that.setState({
                        error: "An error occurred"
                    })
                })
        });
    }

    render() {
        return (
            <div>
                <form action="none">
                    <Username onChange={this.handleUsernameChange} submit={this.sendLogInRequest} />
                    <Password onChange={this.handlePasswordChange} submit={this.sendLogInRequest} />
                    <Button text="Log in" onClick={this.sendLogInRequest} disabled={this.state.disabled || !this.state.username || !this.state.password} />
                </form>
                {this.state.error ? <div className="input-field-container"> <Error text={this.state.error} /></div> : <></>}
                <SmolLink text={"Sign up for an account"} to="/register" />
                <SmolLink text={"Forgot password?"} to="/forgot" />
            </div>
        );
    }
}

export default withRouter(Login);