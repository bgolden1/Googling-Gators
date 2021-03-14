import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


class Register_Page extends Component {
    handleClick() {
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <header className='App-register'>
                    <h>useless registration page</h>
                </header>
            </div>
        );
    }
}

export default Register_Page;