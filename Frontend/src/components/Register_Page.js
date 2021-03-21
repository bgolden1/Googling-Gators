import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class Register_Page extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        console.log(newUser);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to Home
                            </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>Register below</h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>

                        <form novalidate onSubmit={this.onSubmit} class="row g-3 needs-validation">

                            <div className="col-md-4">
                                <label for="first_name" class="form-label">First Name</label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="firstname"
                                    type="text"
                                    required
                                />
                                <div class="valid-feedback">
                                    Looks good!
                                </div>  
                            </div>
                            <div className="col-md-4">
                                <label for="last_name" class="form-label">Last Name</label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="lastname"
                                    type="text"
                                    required
                                />
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label for="email" class="form-label">UFL Email</label>
                                <input
                                    class="form-control"
                                    placeholder="username@ufl.edu"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    required
                                />
                                <div class="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                                     
                            </div>
                            <div className="col-md-6">
                                <label for="password" class="form-label">Password</label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    required
                                />
                                <div class="invalid-feedback">
                                    Please enter a valid password.
                                </div>
                                
                            </div>
                            <div className="col-md-6">
                                <label for="password2" class="form-label" >Confirm Password</label>
                                <input
                                    class="form-control"
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    required
                                />
                                <div class="invalid-feedback">
                                    Passwords do not match.
                                </div>
                                
                            </div>

                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                                        <label class="form-check-label" for="invalidCheck">
                                            I agree to the terms and conditions
                                        </label>
                                        <div class="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
                                </div>
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
                                    className="btn btn-outline-secondary"
                                >
                                    Sign up
                                 </button>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register_Page;