import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


class Login_Page extends Component {
    handleClick() {
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <h>HI</h>

            </div>
        );
    }
}

export default Login_Page;