import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";
import Menubar_Homepage from "./layout/Menubar_Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
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
        axios.get("https://gatorloop-ims.herokuapp.com/api/parts" + this.state.name)
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
        axios.post("https://gatorloop-ims.herokuapp.com/api/parts/checkout", {"_id": this.state.part._id, "num_to_checkout": this.state.num_to_checkout})
        .then(function (result) {
            console.log("Request submitted successfully");
        })
        this.setState({ completed: true });
        
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };



    render() {
        if (this.state.logged_in) {
            if (this.state.completed) {
                return (
                    // <Redirect to="/inventory_page" />
                    // <li >
                    <meta http-equiv="refresh" content="0; url = /inventory_page" />
                    // </li>
                );
            }
            return (
                <div>
                    <Menubar />
                    <div style={{ marginTop: "2rem", marginLeft: "40%", fontFamily: "montserrat" }}>
                        
                     <Link to="/inventory_page" className="btn-flat waves-effect">
                            <i className="material-icons left" style={{ verticalAlign: "-6px" }}>chevron_left</i> Back to Inventory
                     </Link>
                        <div style={{ marginTop: "1rem" }}>
                        <h2><strong>Inventory Checkout</strong></h2>
                     <form novalidate onSubmit={this.onSubmit} class="row g-3 needs-validation">
                            <div style={{  }} className="col-md-5">
                                <label class="form-label">How many <b>{this.state.name}</b> would you like to checkout?</label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    id="num_to_checkout"
                                    type="text"
                                    required
                                />
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            

                            <div className="col s12" style={{ marginLeft: "75%"}}>
                                    <button

                                        style={{
                                            width: "100px",
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
                    <Menubar_Homepage/>
                <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                        <h1>Error: Not Logged In</h1>
                        <div style={{marginLeft: "7%"}}>
                    <Link 
                        to="/login"
                        style={{fontFamily: "montserrat"}}
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