import React from 'react'
import './App.css'
import CoolS from './_Cool_S_.svg';
import {Link} from "react-router-dom";

function Header(){
    return (
        <Link to="/" style={{width: "100%"}}>
        <div className="header">
            <img src={CoolS} height="50px"  alt="Cool S"/>
            <h1 style={{"width": "calc(100% - 50px)"}}>Simon's Capstone Project</h1>
        </div>
        </Link>
    );
}
export default Header;