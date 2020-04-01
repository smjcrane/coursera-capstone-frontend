import React from 'react'
import './inputs.css'

class Username extends React.Component {
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
                htmlFor="username">
                Username
            </label>
            <input
                autoComplete="username"
                name="username"
                type="text"
                className="username"
                hint="username"
                placeholder="Username"
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.onKeyDown}>
            </input>
        </div>);
    }
}

export default Username;