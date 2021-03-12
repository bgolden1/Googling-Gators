import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './gatorlooplogo.jpg'

class Homepage extends Component {
  render() {
    return (
      <div>
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
                    Login</Button>{' '}
                </Link>
                <Button
                    variant='outline-secondary'
                    size='lg'
                    className='App-button'>
                    Register</Button>{' '}
                 </div>
        </>
      </div>
    );
  }
}

export default Homepage;
