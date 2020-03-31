import React from "react";
import SmolLink from "./inputs/SmolLink";

function Footer(){
    return (
        <div className="footer">
            <SmolLink text="About" to="/about"/>
            <SmolLink text="Privacy" to="/privacy" />
        </div>
    )
}

export default Footer;