import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";
import jwt_decode from "jwt-decode";
import Menubar_Homepage from "./layout/Menubar_Homepage";

const Part = props => (
    <tr>
      <td>{props.part.name}</td>
      <td>{props.part.description}</td>
      <td>{props.part.url}</td>
      <td>{props.part.quantity}</td>
      <td>{props.part.cost_per}</td>
    </tr>
)

export default class PO_Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PO: {},
            parts: [],
            id: props.match.params.id,
            err: [],
            user_name: "",
            user_subteam: "",
            user_role: "",
            logged_in: false
        }
    }

    componentDidMount() {
        axios.get("/api/po" + this.state.id)
            .then(response => {
                this.setState({PO: response.data.data, parts: response.data.data.parts});
            })
            .catch(err => {
                console.log(err);
        })
        try{
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({user_name: decoded.name, user_subteam: decoded.subteam, user_role: decoded.role, logged_in: true});
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
                <div style={{ fontFamily: "montserrat" }}>
                    <Menubar />
                    <div style={{ marginLeft: "5rem" }}>
                        <h1 style={{ marginTop: "2rem" }}><strong>PO #{this.state.id}</strong></h1>
                        <h3>Parts Requested:</h3>
                    </div>
                    <table className="table table-bordered col-md-10" 
                        style={{ margin: "10rem", marginTop: "3rem", marginBottom: "1rem" }} 
                    >
                        <thead class="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>URL</th>
                                <th>Quantity Requested</th>
                                <th>Cost Per Part</th>
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
}