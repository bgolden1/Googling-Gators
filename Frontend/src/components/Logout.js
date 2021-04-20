import { Redirect } from 'react-router';
import React, { Component } from "react";


export default class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try {
            global.localStorage.removeItem("jwtToken");
        }
        catch(err) {
            console.log(err);
        }
    }

    render() {
        return(
            <Redirect to="/"/>
        );
    }
}