import React from "react";
import Username from "./Username";
import Password from "./Password";
import Button from "./Button";
import SmolLink from "./SmolLink";

function Login() {
    return (
        <div>
            <form action="https://stormy-ridge-49818.herokuapp.com/auth" method="POST">
            <Username/>
            <Password/>
            <Button text="Log in" type="submit"/>
            </form>
            <SmolLink text={"Sign up for an account"}/>
            <SmolLink text={"Forgot password?"}/>
        </div>
    );
}

export default Login;