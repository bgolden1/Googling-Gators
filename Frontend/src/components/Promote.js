import React, { Component } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class Promote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.match.params.email,
            user_name: "",
            user_email: "",
            user_role: "",
            user_subteam: "",
            logged_in: false
        }
    }
    componentDidMount() {
        try{
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({user_name: decoded.name, user_email: decoded.email, user_subteam: decoded.subteam, user_role: decoded.role, logged_in: true});
        }
        catch(err) {
            console.log(err)
        }
        axios.post("/api/promote", {"email": this.state.email}).then(res => {
            console.log(res);
            global.location.pathname = "/users";
        })
    }

    render() {
        return(
            <h3 class="text-center" style={{ marginTop: "10rem", fontFamily: "montserrat" }}>Loading...</h3>        )
    }
}