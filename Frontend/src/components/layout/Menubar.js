import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./gatorlooplogo.png";
import jwt_decode from "jwt-decode";



class Menubar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            user_email: "",
            user_role: "",
            logged_in: false
        }
    }

    componentDidMount() {
        try {
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({ user_name: decoded.name, user_email: decoded.email, user_role: decoded.role, logged_in: true });
            console.log(decoded);
        }
        catch (err) {
            console.log(err);
        }

    }

    render() {
        return (
            <Navbar variant="light" bg="light">
                <div class="container-fluid" style={{ fontFamily:"montserrat"}}>
                    <a class="navbar-brand" href="/dashboard">
                        <img src={logo} width="187" height="75" alt="gatorloop logo"/>
                    </a>
                    <Nav className="mr-auto">
                        <div style={{ marginLeft: "1rem", marginTop: "1rem"}} >

                            <ul role="tablist" class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link" id="dashboard-tab" href="/dashboard" role="tab" aria-controls="dashboard" aria-selected="true">Dashboard</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link " id="inventory-tab"  href="/inventory_page" role="tab" aria-controls="inventory" aria-selected="false">Inventory</a>
                                </li>

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Purchase Order
                                 </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="/order">PO Dashboard</a></li>
                                        <li><a class="dropdown-item" href="/po_form">PO Form</a></li>
                                        
                                    </ul>
                                </li>

                                {this.state.user_role == "admin" && <li class="nav-item">
                                    <a class="nav-link " id="users-tab"  href="/users" role="tab" aria-controls="users" aria-selected="false">Manage Users</a>
                                </li>}

                                <li class="nav-item">
                                    <a class="nav-link " id="settings-tab" href="/settings" role="tab" aria-controls="settings" aria-selected="false">Settings</a>
                                </li>
                                
                                <li class="nav-item">
                                    <a class="nav-link " id="logout-tab" href="/logout" role="tab" aria-controls="logout" aria-selected="false">Log Out</a>
                                 </li>
                                    


                            </ul>
                           
                        </div>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

export default Menubar;