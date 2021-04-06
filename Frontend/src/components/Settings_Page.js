import React, { Component } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./layout/Menubar";
import jwt_decode from "jwt-decode";

class Settings_Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_name: "",
			user_ufid: "",
			user_email: "",
			user_role: "",
			logged_in: false
		}
	}

	componentDidMount() {
		try {
			const token = global.localStorage.getItem("jwtToken");
        	const decoded = jwt_decode(token);
        	this.setState({user_name: decoded.name, user_ufid: decoded.ufid, user_email: decoded.email, user_role: decoded.role, logged_in: true});
        	console.log(decoded);
		}
		catch(err) {
			console.log(err);
		}
        
	}
	

    render() {
		if (this.state.logged_in) {
			return (  
				<div>
				<Menubar/>
				<div class="container">
				<div class="row gutters">
					<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
						<div class="card h-100">
							<div class="card-body">
								<div class="account-settings">
									<div class="user-profile">		
										<h5 class="user-role">{this.state.user_role}</h5>				            
										<h5 class="user-name">{this.state.user_name}</h5> 	
										<h5 class="user-ufid">{this.state.user_ufid}</h5>						
										<h6 class="user-email">{this.state.user_email}</h6>										
									</div>					            
								</div>
							</div>
						</div>
					</div>
					<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
						<div class="card h-100">
							<div class="card-body">
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 class="mb-3 text-primary">Account Details</h6>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="fullName">Full Name</label>
											<input type="text" class="form-control" id="fullName" placeholder="Enter full name"></input>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="eMail">Email</label>
											<input type="email" class="form-control" id="eMail" placeholder="Enter email ID"></input>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="UFID">UFID</label>
											<input type="text" class="form-control" id="UFID" placeholder="Enter UFID"></input>
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div class="form-group">
											<label for="password">Password</label>
											<input type="text" class="form-control" id="password" placeholder="Enter Password"></input>
										</div>
									</div>
								</div>								
								<div class="row gutters">
									<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">											
										<div class="text-right">																					
											<button type="button" id="submit2" name="Update" class="btn btn-primary">Update</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
				</div>  
			);
		}
		else {
            return (
                <div>
                    <h3>Error: Not Logged In</h3>
                    <Link 
                        to="/login"
						style={{ fontFamily: "montserrat" }}
                        className="col s5 brand-logo center black-text">
                        Return to Login Page
                    </Link>
                </div>
            );
        }
        
    }
}

export default Settings_Page;




	