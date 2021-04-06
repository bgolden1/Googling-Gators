import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Menubar_Homepage from "./layout/Menubar_Homepage";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            part: {},
            num_to_checkout: 0,
            completed: false,
            user_name: "",
            user_role: "",
            user_subteam: "",
            logged_in: false
        };
    }

    componentDidMount() {
        try{
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({user_name: decoded.name, user_subteam: decoded.subteam, user_role: decoded.role, logged_in: true});
        }
        catch(err) {
            console.log(err)
        }
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post("/api/parts/add", {"name": this.state.part.name, "num_to_checkout": this.state.num_to_checkout})
        .then(function (result) {
            console.log("Request submitted successfully");
        })
        this.setState({completed: true});
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        if (this.state.logged_in) {
            if (this.state.completed) {
                return (
                <Redirect to="/inventory_page"/>
                );
            }
            return (
                <div style={{ marginTop: "4rem", marginLeft: "40%" }}>
                    How many {this.state.name} would you like to checkout?
                    <form onSubmit={this.onSubmit}>
                        <input type="text" id="num_to_checkout" onChange={this.onChange}/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Menubar_Homepage />
                    <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                        <h1>Error: Not Logged In</h1>
                        <div style={{ marginLeft: "7%" }}>
                            <Link
                                to="/login"
                                style={{ fontFamily: "montserrat" }}
                                className="col s5 brand-logo center black-text">
                                Return to Login Page
                    </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}