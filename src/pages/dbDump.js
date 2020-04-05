import React from "react";
import ReactJson from "react-json-view";

class DbDump extends React.Component{
    constructor(props){
        super(props)
        this.state={
            msg: "Loading...",
            data: {}
        }
    }

    componentDidMount() {
        fetch("https://stormy-ridge-49818.herokuapp.com/dbdump")
            .then(res => res.json())
            .then(data => this.setState({data: data, msg: false}))
            .catch(() => this.setState({msg: "Error!"}))
    }

    render(){
        return (<div>
            <h2>{this.state.msg}</h2>
            <ReactJson
                src={this.state.data}
                collapsed="2"
                collapseStringsAfterLength="20"
                displayObjectSize="false"
                displayDataTypes="false"
            />
        </div>)
    }
}

export default DbDump