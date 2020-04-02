import React from 'react'
import './inputs.css'

class PhoneNumber extends React.Component {
    constructor(props)
    {
        super(props)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    onKeyDown(event)
    {
        if (event.key === "Enter") {
            this.props.submit()
        }
    }

    render()
    {
        return (<div className="input-field-container" tabIndex={-1}>
            <label
                htmlFor="phone">
                {this.props.text || "Phone Number (optional)"}
            </label>
            <input
                autoComplete="phone"
                name="phone"
                type="tel"
                className="username"
                hint="Phone number"
                placeholder="Phone number"
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.onKeyDown}>
            </input>
        </div>);
    }
}

export default PhoneNumber;