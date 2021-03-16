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
                <header className='App-login'>
                    <h>This site does absoultely nothing right now</h>
                </header>
            </div>
        );
    }
}

export default Login_Page;