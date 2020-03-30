import React from "react";
import Username from "./Username";
import Password from "./Password";
import Button from "./Button";
import SmolLink from "./SmolLink";

function Login() {
    return (
        <div>
            <Username/>
            <Password/>
            <Button text={"Log in"}/>
            <SmolLink text={"Sign up for an account"}/>
            <SmolLink text={"Forgot password?"}/>
        </div>
    );
}

export default Login;