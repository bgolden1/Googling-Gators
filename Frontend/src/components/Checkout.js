import React, { Component } from "react";
import axios from "axios";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
            part: {},
            num_to_checkout: 0,
        };
    }

    componentDidMount() {
        axios.get("/api/parts" + this.state.name)
            .then(response => {
                this.setState({part: response.data.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post("/api/parts/checkout", {"_id": this.state.part._id, "num_to_checkout": this.state.num_to_checkout})
        .then(function (result) {
            console.warn("Request submitted successfully");
            
        })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                How many {this.state.name} would you like to checkout?
            </form>
        )
    }
}