import React from 'react'
import './inputs.css'

function Password(){
    return (<div className="input-field-container">
        <label
            htmlFor="password">
            Password
        </label>
        <input
            id="password"
            type="password"
            className="password"
            hint="password">
        </input>
    </div>);
    // TODO: password advice and strength meter

}

export default Password;