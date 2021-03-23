import React, { Component } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./layout/Menubar";
import jwt_decode from "jwt-decode";


const Part = props => (
    <tr>
      <td>{props.part.name}</td>
      <td>{props.part.description}</td>
      <td>{props.part.quantity_available}</td>
      <td>{props.part.total_quantity}</td>
      <td>{props.part.last_checked_out}</td>
      <td>
          <div><Link to={"/checkout" + props.part.name}>Check-out</Link></div>
          <div><Link to={"/checkin" + props.part.name}>Check-in</Link></div>
      </td>
    </tr>
  )

class Inventory_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            name: "",
            subteam: "",
            errors: {},
            logged_in: false
        };
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
            this.setState({name: decoded.name, subteam: decoded.subteam, logged_in: true});
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

    render() {
        if (this.state.logged_in) {
            return (
                <div>
                    <Menubar/>
                    <h3 style={{ marginLeft: "2rem" }}>Parts List</h3>
                    <table className="table table-striped" style={{ margin: 30 }} >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity Available</th>
                                <th>Total Quantity</th>
                                <th>Last Checked Out</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.partsList() }
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <h3>Error: Not Logged In</h3>
            );
        }
        
    }
}

export default Inventory_Page;