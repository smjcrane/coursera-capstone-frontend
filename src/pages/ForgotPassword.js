import React from "react";
import Username from "../inputs/Username";
import Button from "../inputs/Button";
import Error from "../inputs/Error";
import {withRouter} from "react-router-dom";
import SmolLink from "../inputs/SmolLink";

class ForgotPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            error: false,
            disabled: false,
        }
        this.sendResetRequest = this.sendResetRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value, error: false})
    }


    sendResetRequest(){
        this.setState({disabled: true, error: false})
        setTimeout(() => this.setState({disabled: false}), 2000)
        let that=this;
        window.grecaptcha.execute('6LfK6-YUAAAAAAMeD2eJabGWBPfDogVGKWpLXItJ', {action: 'homepage'}).then(function(token) {
            fetch("https://stormy-ridge-49818.herokuapp.com/sendresetcode", {
            method: "post",
            credentials: "include",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: that.state.username,
                token: token,
            })
        }).then(res => {
                if (res.status === 200){
                    that.props.history.push("/entercode?username="+that.state.username)
                } else {
                   that.setState({
                       error: "An error occurred"
                   })
                }
            }).catch(() => {
                that.setState({
                    error: "An error occurred"
                })
            })
        })
    }

    render() {
        return (
            <>
                <h1>Password Recovery</h1>
                <p style={{"width": "90%"}}>If you have given us your phone number, we can send you a code to reset your password</p>
                <div>
                <form action="none">
                    <Username onChange={this.handleUsernameChange} submit={this.sendResetRequest}/>
                    <Button text="Send Reset Code" onClick={this.sendResetRequest} disabled={this.state.disabled}/>
                </form>
                {this.state.error? <div className="input-field-container"> <Error text={this.state.error} /></div> : <></>}
                <SmolLink text="Back to login" to="/index.html"/>
            </div>
                </>
        );
    }
}

export default withRouter(ForgotPassword);