import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
//import { Redirect } from 'react-router';


class Register_Page extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            ufid: "",
            subteam: "",
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
            name: this.state.firstname + ' ' + this.state.lastname,
            ufid: this.state.ufid,
            subteam: this.state.subteam,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        axios.post("http://localhost:8080/api/register", newUser).then(function(res) {
            global.location.pathname = "/confirm";
        }).catch(err => {
            console.log(err.response.data);
            this.setState({errors: err.response.data});
        })
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem", fontFamily: "montserrat"}} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-link waves-effect">
                            <i className="material-icons">chevron_left</i> Back to Home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "0", paddingTop: "1rem" }}>
                            <h4><strong>Register below</strong></h4>
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
                            <div className="col-md-4">
                                <label for="ufid" class="form-label">UFID</label>
                                <input
                                    class="form-control"                                  
                                    onChange={this.onChange}
                                    value={this.state.ufid}
                                    error={errors.ufid}
                                    id="ufid"
                                    type="text"
                                    required
                                />
                                <div class="invalid-feedback">
                                    Please enter a valid UFID.
                                </div>
                                     
                            </div>
                            <div className="col-md-6">
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
                                <label for="subteam" class="form-label">Subteam</label>
                                <input
                                    class="form-control"                                  
                                    onChange={this.onChange}
                                    value={this.state.subteam}
                                    error={errors.subteam}
                                    id="subteam"
                                    type="text"
                                    required
                                />
                                <div class="invalid-feedback">
                                    Please enter a valid Subteam.
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
                                    onSubmit={this.onSubmit}
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