import React, { Component } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class UpgradeStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
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
            if (decoded.role == "admin") {
                this.setState({user_name: decoded.name, user_subteam: decoded.subteam, user_role: decoded.role, logged_in: true});
            }
        }
        catch(err) {
            console.log(err)
        }
        axios.post("https://gatorloop-ims.herokuapp.com/api/upgradeStatus", {"id": this.state.id}).then(res => {
            console.log(res);
            global.location.pathname = "/order";
        })
    }

    render() {
        return(
            <h3 class="text-center" style={{ marginTop: "10rem", fontFamily: "montserrat" }}>Loading...</h3>
        )
    }
}