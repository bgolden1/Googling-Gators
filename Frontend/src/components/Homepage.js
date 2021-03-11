import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Button variant='outline-secondary' size='lg' className='App-button'>Login</Button>{' '}
          <Button variant='outline-secondary' size='lg' className='App-button'>Register</Button>{' '}
        </>
      </div>
    );
  }
}

export default Homepage;
