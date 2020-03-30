import React from 'react'
import './inputs.css'

function SmolLink(props){
    return (<div className="input-field-container">
        <p
            className="smol-link"
            tabIndex={0}
        >
            {props.text}
        </p>
    </div>);
}

export default SmolLink;