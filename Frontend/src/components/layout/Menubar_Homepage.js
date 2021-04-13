import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./gatorlooplogo.png";

class Menubar_Homepage extends Component {
    render() {
        return (
            <Navbar variant="light" bg="light">
                <div class="container-fluid" style={{ fontFamily:"montserrat" }} >
                    <a class="navbar-brand" href="/">
                        <img src={logo} width="187" height="75" alt=""/>
                    </a>
                    <Nav className="mr-auto">   
                        <div style={{ marginLeft: "1rem" }}>
          
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact Us</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    About Us
                                 </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Mission Statement</a></li>
                                    <li><a class="dropdown-item" href="#">Officers</a></li>
                                    <li><a class="dropdown-item" href="#">Projects/Awards</a></li>
                                </ul>
                                        </li>
                                
                            </ul>
                         </div>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

export default Menubar_Homepage;