import React, { Component } from "react";
import { Link, Router } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Menubar extends Component {
    render() {
        return (
            <Navbar variant="light" bg="light">
                <div >
                    <Navbar.Brand href="/">Gatorloop</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link
                                to="/dashboard"
                                style={{fontFamily: "montserrat"}}
                                className="s5 brand-logo center black-text">
                                Dashboard
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link 
                                to="/inventory_page"
                                style={{fontFamily: "montserrat"}}
                                >
                                Inventory
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link 
                                to="/order"
                                style={{fontFamily: "montserrat"}}
                                className="col s5 brand-logo center black-text">
                                Order History
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link 
                                to="/settings"
                                style={{fontFamily: "montserrat"}}
                                className="col s5 brand-logo center black-text">
                                Settings
                            </Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link 
                                to="/logout"
                                style={{fontFamily: "montserrat"}}
                                className="col s5 brand-logo center black-text">
                                Log out
                            </Link>
                        </Nav.Link>

                    </Nav>
                </div>             
            </Navbar>
        );
    }
}

export default Menubar;