import React from 'react'
import './inputs.css'

class Password extends React.Component{
    constructor(props){
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    onKeyDown(event){
        if (event.key === "Enter"){
            this.props.submit()
        }
    }

    render() {
        return (<div className="input-field-container" tabIndex={-1}>
            <label
                htmlFor="password">
                {this.props.text || "Password"}
            </label>
            <input
                onChange={this.props.onChange}
                onKeyDown={this.onKeyDown}
                autoComplete="password"
                name="password"
                type="password"
                placeholder="*************"
                className="password"
                hint="password">
            </input>
        </div>);
    }
}

export default Password;