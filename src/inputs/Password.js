import React from 'react'
import './inputs.css'

function Password(props){
    return (<div className="input-field-container" tabIndex={-1}>
        <label
            htmlFor="password">
            Password
        </label>
        <input
            onChange={props.onChange}
            autoComplete="password"
            id="password"
            name="password"
            type="password"
            placeholder="*************"
            className="password"
            hint="password">
        </input>
    </div>);
    // TODO: password advice and strength meter

}

export default Password;