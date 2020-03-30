import React from 'react'
import './inputs.css'

function Username(){
    return (<div className="input-field-container" tabIndex={-1}>
        <label
            htmlFor="username">
            Username
        </label>
        <input
            id="username"
            type="text"
            className="username"
            hint="username">
        </input>
    </div>);
}

export default Username;