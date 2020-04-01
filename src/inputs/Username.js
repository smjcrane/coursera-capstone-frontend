import React from 'react'
import './inputs.css'

function Username(props){
    return (<div className="input-field-container" tabIndex={-1}>
        <label
            htmlFor="username">
            Username
        </label>
        <input
            autoComplete="username"
            id="username"
            name="username"
            type="text"
            className="username"
            hint="username"
            placeholder="Username"
            value={props.value}
            onChange={props.onChange}>
        </input>
    </div>);
}

export default Username;