import React from "react";
import './inputs/Username';
import './inputs/Password';
import Username from "./inputs/Username";
import Password from "./inputs/Password";

function Login() {
    return (
        <div>
            <Username/> <br />
            <Password/>
        </div>
    );
}

export default Login;