import React, { Component } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./layout/Menubar";

class Settings_Page extends Component {
    render() {
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
						            <h5 class="user-name">User Name</h5> 
						            <h6 class="user-email">user@gmail.com</h6>
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
							            <label for="phone">Phone</label>
							            <input type="text" class="form-control" id="phone" placeholder="Enter phone number"></input>
						            </div>
					            </div>
					            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						            <div class="form-group">
							            <label for="website">Website URL</label>
							            <input type="url" class="form-control" id="website" placeholder="Website url"></input>
						            </div>
					            </div>
				            </div>
				            <div class="row gutters">
					            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						            <h6 class="mb-3 text-primary">Address</h6>
					            </div>
					            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						            <div class="form-group">
							            <label for="Street">Street</label>
							            <input type="name" class="form-control" id="Street" placeholder="Enter Street"></input>
						            </div>
					            </div>
					            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						            <div class="form-group">
							            <label for="ciTy">City</label>
							            <input type="name" class="form-control" id="ciTy" placeholder="Enter City"></input>
						            </div>
					            </div>
					            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						            <div class="form-group">
							            <label for="sTate">State</label>
							            <input type="text" class="form-control" id="sTate" placeholder="Enter State"></input>
						            </div>
					            </div>
					            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						            <div class="form-group">
							            <label for="zIp">Zip Code</label>
							            <input type="text" class="form-control" id="zIp" placeholder="Zip Code"></input>
						            </div>
					            </div>
				            </div>
				            <div class="row gutters">
					            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						            <div class="text-right">
							            <button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
							            <button type="button" id="submit" name="submit" class="btn btn-primary">Update</button>
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
}

export default Settings_Page;




	