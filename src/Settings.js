import React from "react";
import Password from "./inputs/Password";
import {PasswordStrength} from "./inputs/PasswordStrength";
import PhoneNumber from "./inputs/PhoneNumber";
import Button from "./inputs/Button";

class Settings extends React.Component{
    constructor(props){
        super(props)
        this.state={
            oldPassword: "",
            password: "",
            confirmPassword: "",
            passwordsMatch: true,
            phone: "",
            phoneAllowed: false,
            disabled: true,
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
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

    render(){
        return(<>
            <h1>Settings</h1>
            <Password text="Current Password" />
            <h2>Change Password</h2>
            <Password text="New Password" onChange={this.handlePasswordChange}/>
            {!this.state.password || <PasswordStrength value={this.state.password}/> }
            <Password text="Confirm Password" onChange={this.handleConfirmPasswordChange}/>
            <Button text="Change password" />
            <h2>Add password recovery</h2>
            <PhoneNumber onChange={this.handlePhoneChange}/>
            <Button text="Change phone number" />
            </>)
    }
}

export default Settings