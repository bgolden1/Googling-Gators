import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Menubar_Homepage from "./layout/Menubar_Homepage";
import Menubar from "./layout/Menubar";

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            quantity: "",
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
            if (decoded.role == "admin") {
                this.setState({user_name: decoded.name, user_subteam: decoded.subteam, user_role: decoded.role, logged_in: true});
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post("https://gatorloop-ims.herokuapp.com/api/parts/add", {"name": this.state.name, "description": this.state.description, "quantity": this.state.quantity})
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
                    <meta http-equiv="refresh" content="0; url = /inventory_page" />
                    //<Redirect to="/inventory_page"/>
                );
            }
            return (
                <div>
                <Menubar/>
                    <div style={{ marginTop: "2rem", marginLeft: "25%", fontFamily: "montserrat" }}>

                        <Link to="/inventory_page" className="btn-flat waves-effect">
                            <i className="material-icons left" style={{ verticalAlign: "-6px" }}>chevron_left</i> Back to Inventory
                        </Link>

                        <div style={{marginTop:"1rem"}}>
                        <h2><strong>Add a New Part</strong></h2>

                            <form novalidate onSubmit={this.onSubmit} class="needs-validation">
                                <div class="row mb-3 ">

                             <div class="col-sm-4">
                                <label class="form-label">Part Name: </label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    id="name"
                                    type="text"
                                    required
                                />
                                    </div>
                                </div>
                                <div class="row mb-3">
                            <div class="col-md-8">
                                <label class="form-label">Part Description: </label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    id="description"
                                    type="text"
                                    required
                                />
                                    </div>
                                </div>
                                <div class="row mb-3">
                            <div class="col-1">
                                <label class="form-label">Quantity: </label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    id="quantity"
                                    type="text"
                                    required
                                />
                                    </div>
                                </div>
                                
                                <div class="row mb-3">
                            <div className="col 12" >
                                    <button
                                        style={{
                                            width: "120px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        type="submit"
                                        className="btn btn-outline-secondary"
                                    >
                                        Submit
                                 </button>

                            </div>
                            </div>
                        </form>
                    
                </div>
                </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Menubar_Homepage />
                    <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                        <h1>Error: Not Logged In With Appropriate Permissions</h1>
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