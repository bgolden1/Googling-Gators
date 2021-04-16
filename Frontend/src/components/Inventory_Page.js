import React, { Component } from 'react';
import { useState } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./layout/Menubar";
import Menubar_Homepage from "./layout/Menubar_Homepage";
import Searchbar from "./Searchbar";
import jwt_decode from "jwt-decode";


const Part = props => (
    <tr>
      <td>{props.part.name}</td>
      <td>{props.part.description}</td>
      <td>{props.part.quantity_available}</td>
      <td>{props.part.total_quantity}</td>
      <td>{props.part.last_checked_out.substring(0, 10)}</td>
      <td>
          <div><Link to={"/checkin" + props.part.name}>Check-in</Link></div>
          <div><Link to={"/checkout" + props.part.name}>Check-out</Link></div>
      </td>
      {jwt_decode(global.localStorage.getItem("jwtToken")).role == "admin" && 
      <td>
          <div><Link to={"/removePart" + props.part.name}>Remove</Link></div>
      </td>}
    </tr>
)

class Inventory_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            partName: props.match.params.name,
            name: "",
            subteam: "",
            role: "",
            errors: {},
            logged_in: false,
            searchValue: '',
            filteredParts: []
        };
    }

    callBack=(dataFromChild)=> {
        this.setState({ searchValue: dataFromChild });
        console.log(this.state.searchValue);
    }
    

    componentDidMount() {
        axios.get("/api/parts")
            .then(response => {
                this.setState({parts: response.data.data});
            })
            .catch(err => {
                console.log(err);
            });
        try{
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({name: decoded.name, subteam: decoded.subteam, role: decoded.role, logged_in: true});
        }
        catch(err) {
            console.log(err)
        }
        
    }

    

    partsList() {
        return this.state.parts.map(function(currentPart, i) {
            return <Part part={currentPart} key={i} />;
        })
    }

    partsSearch(query) {
        var parts = this.state.parts;
        var searched_parts = [];
        /*
        for (var i = 0; i < parts.length; i += 1) {
            if (parts[i].name.toLowerCase().includes(query.toLowerCase())) {
                searched_parts.push(parts[i])
            }
        }
        */
        searched_parts = this.state.parts.filter(part=>part.toLowerCase().includes(this.state.searchValue.toLowerCase()))
        return searched_parts.map(function(currentPart, i) {
            return <Part part={currentPart} key={i} />;
        });
    }

    searchFunc() {
        /*
        const { search } = window.location;
        const query = new URLSearchParams(search).get("s");
        var filteredParts = this.partsList();
        */
        const query = this.searchValue;
        this.state.filteredParts = this.partsList();
        if (query != null && query != "") {
            this.state.filteredParts = this.partsSearch(query);
        }
        
    }

    render() {
        if (this.state.logged_in) {
            return (
                <div style={{ fontFamily: "montserrat" }}>
                    <Menubar />
                    
                    <Searchbar callbackFromParent={this.callBack} />
                    {this.searchFunc()}
                    <div>
                        <table className="table table-bordered col-md-10"
                            style={{ margin: "10rem", marginTop: "7rem", marginBottom: "1rem" }}
                        >
                            <thead class="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Quantity Available</th>
                                    <th>Total Quantity</th>
                                    <th>Last Checked Out</th>
                                    <th>Actions</th>
                                    {this.state.role == 'admin' && <th>Admin Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filteredParts}
                            </tbody>
                        </table>

                        {this.state.role == 'admin' &&
                            <div style={{ marginLeft: "10rem", marginBottom: "1rem" }}>
                                <Link to={"/add"}><button className="btn btn-outline-secondary">Add</button></Link>
                            </div>}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Menubar_Homepage />
                    <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                        <h1>Error: Not Logged In</h1>
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
};

export default Inventory_Page;