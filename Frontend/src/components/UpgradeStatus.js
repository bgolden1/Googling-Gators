import React, { Component } from 'react';
import axios from "axios";

export default class UpgradeStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id
        }
    }
    componentDidMount() {
        axios.post("/api/upgradeStatus", {"id": this.state.id}).then(res => {
            console.log(res);
            global.location.pathname = "/order";
        })
    }

    render() {
        return(
            <h3>Loading...</h3>
        )
    }
}