import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class Login_Page extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4><b>Welcome</b> Gatorloop Members</h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="mb-3">
                                <label for="emailinput" class="form-label">UFL Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    aria-describedby="emailHelp"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                />
                                
                            </div>

                            <div className="mb-3">
                                <label for="passwordinput" class="form-label">Password</label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                
                            </div>

                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-primary"
                                   >
                                   Login
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login_Page;