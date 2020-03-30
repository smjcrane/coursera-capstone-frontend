import React from 'react'
import './inputs.css'

function Password(){
    return (<>
        <label
            htmlFor="password">
            Password
        </label>
        <input
            id="password"
            type="text"
            className="password"
            hint="password">
        </input>
    </>);
    // TODO: password advice and strength meter

}

export default Password;