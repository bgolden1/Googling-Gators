import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
                        <Link
                            to="/"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center black-text"
                        >
                            <i className="material-icons">code</i>
                            Menu
                        </Link>
                        <Link
                            to="/inventory_page"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center black-text"
                        >
                            <i className="material-icons">code</i>
                            Inventory
                        </Link>
                        <Link
                            to="/order"
                            style={{
                                fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo center black-text"
                        >
                            <i className="material-icons">code</i>
                            Order History
                        </Link>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;