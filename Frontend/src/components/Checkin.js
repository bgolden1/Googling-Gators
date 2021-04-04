import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

export default class Checkin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
            part: {},
            num_to_checkin: 0,
            completed: false,
            user_name: "",
            user_role: "",
            user_subteam: "",
            logged_in: false
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
        axios.post("/api/parts/checkin", {"_id": this.state.part._id, "num_to_checkin": this.state.num_to_checkin})
        .then(function (result) {
            console.warn("Request submitted successfully");
        })
        this.setState({completed: true});
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        if (this.state.logged_in) {
            if (this.state.completed) {
                return (<Redirect to="/inventory_page"/>);
            }
            return (
                <div style={{ marginTop: "4rem", marginLeft: "40%" }}>
                    How many {this.state.name} would you like to check-in?
                    <form onSubmit={this.onSubmit}>
                        <input type="text" id="num_to_checkin" onChange={this.onChange}/>
                        <input type="submit" value="Submit"/>
                    </form>
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