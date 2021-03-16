import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
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
            <Button
                variant='outline-secondary'
                size='lg'
                className='App-button'>
                            <b>Login</b></Button>{' '}

            // This is the other button style
            <Button
                 style={{
                             width: "150px",
                             borderRadius: "3px",
                             letterSpacing: "1.5px",
                             marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn waves-effect waves-light"
                  >
                        <b>Login</b>
                        </Button>
            // Delete this section if you don't like the button

            </Link>

            <Link to="/register">
            <Button
                variant='outline-secondary'
                size='lg'
                className='App-button'>
                Register</Button>{' '}
            </Link>
          </div>
        </>
      </div>
    );
  }
}

export default Homepage;
