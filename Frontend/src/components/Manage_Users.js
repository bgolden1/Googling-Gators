import React, { Component } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./layout/Menubar";
import Menubar_Homepage from "./layout/Menubar_Homepage";
import jwt_decode from "jwt-decode";


const User = props => (
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.subteam}</td>
      <td>{props.user.ufid}</td>
      <td>{props.user.email}</td>
      <td>{props.user.role}</td>
      <td>
          <div><Link to={"/promote" + props.user.email}>Promote</Link></div>
          <div><Link to={"/demote" + props.user.email}>Demote</Link></div>
      </td>
    </tr>
  )

class Manage_Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: "",
            subteam: "",
            role: "",
            errors: {},
            is_admin: false
        };
    }

    componentDidMount() {
        axios.get("https://gatorloop-ims.herokuapp.com/api/users")
            .then(response => {
                this.setState({users: response.data.data});
            })
            .catch(err => {
                console.log(err);
            });
        try{
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            if (decoded.role == "admin") {
                this.setState({name: decoded.name, subteam: decoded.subteam, role: decoded.role, is_admin: true});
            }
            }
        catch(err) {
            console.log(err)
        }
        
    }

    partsList() {
        return this.state.users.map(function(currentUser, i) {
            return <User user={currentUser} key={i} />;
        })
    }

    render() {
        if (this.state.is_admin) {
            return (
                <div style={{ fontFamily: "montserrat" }}>
                    <Menubar />
                    <h1 style={{ float: "left", marginLeft: "5rem", marginTop: "2rem" }}>
                        <strong>Users</strong>
                    </h1>
                    <table className="table table-bordered col-md-10" 
                        style={{ margin: "10rem", marginTop: "7rem", marginBottom: "1rem" }} 
                    >
                        <thead class="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Subteam</th>
                                <th>UFID</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.partsList()}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Menubar_Homepage />
                    <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                        <h1>Error: Not an Admin</h1>
                        <div style={{ marginLeft: "7%" }}>
                            <Link
                                to="/login"
                                style={{ fontFamily: "montserrat" }}
                                className="col s5 brand-logo center black-text">
                                Return to Login Page
                    </Link>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default Manage_Users;