import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './gatorlooplogo.jpg'
import Menubar from "./layout/Menubar";

class Homepage extends Component {
  render() {
    return (
        <div>
            <Menubar />
            <header style={{ marginTop: "4rem" }} className='App-header' class="text-center">
                <img src={logo} className='App-logo'/>
                <h1>Welcome to the GatorLoop Inventory Management System!</h1>
            </header>
            <>
          
                <div class="text-center" style={{ marginTop: "6rem" }}>
            <Link to="/login">
            <button
                class='btn btn-outline-secondary btn-lg'>
                     Login</button>{' '}
            </Link>

            <Link to="/register">
            <button
                class='btn btn-outline-secondary btn-lg'>
                Register</button>{' '}
            </Link>
          </div>
        </>
      </div>
    );
  }
}

export default Homepage;
