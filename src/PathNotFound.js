import React from "react";

function PathNotFound(){
    return (
        <div style={{"padding": "20px"}}>
            <h2>Path not found</h2>
            <p>The page you were looking for does not exist.  Would you like to &nbsp;
                <span style={{"text-decoration": "underline"}}>
                    <a href="/inbox">
                        check your inbox?
                    </a>
                </span>
                </p>
        </div>
    )
}

export default PathNotFound;