import React from 'react'
import './inputs.css'

function Username(){
    return (<>
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
    </>);
}

export default Username;