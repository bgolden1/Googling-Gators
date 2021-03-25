import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './gatorlooplogo.jpg';
import Menubar_Homepage from "./layout/Menubar_Homepage";

class Homepage extends Component {
  render() {
    return (
        <div>
            <Menubar_Homepage/>
            <header style={{ marginTop: "4rem", fontFamily:"montserrat"}} className='App-header' class="text-center">
                <img src={logo} className='App-logo'/>
                <h1>Welcome to the GatorLoop Inventory Management System!</h1>
            </header>
            <>
          
                <div class="text-center" style={{ marginTop: "6rem" }}>
            <Link to="/login">
                <button
                    style={{
                        width: "130px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "2rem",
                        fontFamily: "montserrat"
                    }}
                    className="btn btn-outline-secondary btn-lg mr-2"
                >
                Login 
                </button>
            </Link>

            <Link to="/register">
            <button
                    style={{
                        width: "130px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "2rem",
                        fontFamily: "montserrat"
                    }}
                    className="btn btn-outline-secondary btn-lg mr-2"
                >
                Register 
                </button>
            </Link>
          </div>
        </>
      </div>
    );
  }
}

export default Homepage;
