import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./layout/Menubar";
import jwt_decode from "jwt-decode";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            user_email: "",
            logged_in: false
        }
    }

    componentDidMount() {
        try {
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({ user_name: decoded.name, user_email: decoded.email, logged_in: true });
            console.log(decoded);
        }
        catch (err) {
            console.log(err);
        }

    }


    render() {
        if (this.state.logged_in) {
            return (
                <div>
                    <Menubar />
                    <div class="text-center" style={{ marginTop: "12rem" }}>

                        <h1> <b>Welcome,</b> {this.state.user_name}</h1>
                        <h3><small class="text-muted">Where do you want to go?</small></h3>

                        <div className="col s12">

                            <Link to="/inventory_page">
                                <button
                                    
                                    style={{

                                        width: "250px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "2rem"
                                        
                                    }}
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    Inventory Display
                                 </button>
                            </Link>

                            

                            <Link to="/order">
                                <button
                                    style={{
                                        width: "200px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "2rem"
                                    }}
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    PO Dashboard
                                 </button>
                            </Link>

                            <Link to="/po_form">
                                <button
                                    style={{
                                        width: "200px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "2rem"
                                    }}
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    PO Request
                                 </button>
                            </Link>

                            <Link to="/settings">
                                <button
                                    style={{
                                        width: "200px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "2rem"
                                    }}
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    Settings
                                 </button>
                            </Link>

                            <Link to="/logout">
                                <button
                                    style={{
                                        width: "200px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "2rem"
                                    }}
                                    className="btn btn-outline-secondary btn-lg"
                                >
                                    Log Out
                                 </button>
                            </Link>


                        </div>

                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h3>Error: Not Logged In</h3>
                    <Link
                        to="/login"
                        style={{ fontFamily: "montserrat" }}
                        className="col s5 brand-logo center black-text">
                        Return to Login Page
                    </Link>
                </div>
            );
        }
    }
}

export default Dashboard;
