import React from 'react'
import './inputs.css'

function SmolLink(props){
    return (<div className="input-field-container" {...props.extraprops}>
        <a href={props.to} tabIndex="-1">
        <p
            className="smol-link"
            tabIndex={0}
        >
            {props.text}
        </p>
        </a>
    </div>);
}

export default SmolLink;