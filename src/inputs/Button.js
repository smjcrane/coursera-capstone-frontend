import React from 'react'
import './inputs.css'

function Button(props){
    return (<div className="input-field-container">
        <input
            className="button"
            type="button"
            value={props.text} />
    </div>);
}

export default Button;