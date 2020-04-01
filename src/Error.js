import React from "react"
import warning from "./warning.png"

function Error(props){
    return(
        <div className="error-container">
            <img src={warning} alt="Warning!" height="20px" width="20px" />
            <p className="error">{props.text}</p>
        </div>
    )
}

export default Error;