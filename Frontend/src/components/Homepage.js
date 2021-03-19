import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './gatorlooplogo.jpg'
import Navbar from "./layout/Navbar";

class Homepage extends Component {
  render() {
    return (
        <div>
            <Navbar/>
            <header className='App-header'>
                <img src={logo} className='App-logo'/>
                <h1>Welcome to the GatorLoop Inventory Management System!</h1>
            </header>
            <>
          
          <div class="text-center">
            <Link to="/login">
            <button
                class='btn btn-primary btn-lg'>
                     Login</button>{' '}
            </Link>

            <Link to="/register">
            <button
                class='btn btn-primary btn-lg'>
                Register</button>{' '}
            </Link>
          </div>
        </>
      </div>
    );
  }
}

export default Homepage;
