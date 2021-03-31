import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RemovePart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
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

    onSubmitYes = e => {
        axios.post("/api/parts/remove" + this.state.name)
            .then(function(res) {
                global.location.pathname = "/inventory_page";
            })
            .catch(err => {
                console.log(err)
            })
    }

    onSubmitNo() {
        global.location.pathname = "/inventory_page";
    }

    render() {
        if (this.state.logged_in) {
            return (
                <div style={{ marginTop: "4rem", marginLeft: "5rem" }}>
                    <h3>Are you sure you want to remove {this.state.name}?</h3>
                    <button 
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                    className="btn btn-outline-secondary"
                    type="submit"
                    onClick={this.onSubmitYes}>
                        Yes
                    </button>
                    <button 
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                    className="btn btn-outline-secondary"
                    type="submit"
                    onClick={this.onSubmitNo}>
                        No
                    </button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Error: Not Logged In</h3>
                    <Link 
                        to="/login"
                        style={{fontFamily: "montserrat"}}
                        className="col s5 brand-logo center black-text">
                        Return to Login Page
                    </Link>
                </div>
            );
        }
    }
}