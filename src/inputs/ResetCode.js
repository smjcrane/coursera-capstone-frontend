import React from 'react'
import './inputs.css'

class ResetCode extends React.Component {
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
                htmlFor="resetcode">
                {this.props.text || "Reset Code"}
            </label>
            <input
                autoComplete="none"
                name="resetcode"
                type="text"
                className="username"
                hint="reset code"
                placeholder="abc123"
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.onKeyDown}>
            </input>
        </div>);
    }
}

export default ResetCode;