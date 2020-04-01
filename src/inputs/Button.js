import React from 'react'
import './inputs.css'

function Button(props){
    return (<div className="input-field-container" tabIndex={-1}>
        <button disabled={props.disabled} onClick={props.onClick}>
            {props.text}
        </button>
    </div>);
}

export default Button;