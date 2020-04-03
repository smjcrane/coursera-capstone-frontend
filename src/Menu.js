import React from "react";
import logout from "./artmaster_logout_mini_icon.svg"
import {withRouter} from "react-router-dom"
import SmolLink from "./inputs/SmolLink";

class Menu extends React.Component{
    constructor(props) {
        super(props);
        this.sendLogOutRequest = this.sendLogOutRequest.bind(this)
    }


    sendLogOutRequest() {
        fetch("https://stormy-ridge-49818.herokuapp.com/logout",
            {
                method: "post",
                credentials: "include",
            })
            .then(this.props.history.push("/index.html"))
    }

    render(){
        return (
            <div className="menu">
                <img src={logout} alt="Log out" height="40px" onClick={this.sendLogOutRequest}/>
                <SmolLink to="/settings" text="Account Settings" extraprops={{style: {"textAlign": "right"}}}/>
            </div>
        )
    }

}

export default withRouter(Menu);