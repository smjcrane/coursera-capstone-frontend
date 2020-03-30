import React from "react";
import "./App.css"

function Centered(props){
    return (
        <div className="Centered">
            {props.children}
        </div>
    )
}

export default Centered;