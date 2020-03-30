import React from "react";
import Username from "./Username";
import Password from "./Password";
import Button from "./Button";

function Login() {
    return (
        <div>
            <Username/>
            <Password/>
            <Button text={"Log in"}/>
        </div>
    );
}

export default Login;