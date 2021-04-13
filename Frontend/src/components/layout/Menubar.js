import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./gatorlooplogo.png";



class Menubar extends Component {
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