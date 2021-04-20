import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";
import jwt_decode from "jwt-decode";
import Menubar_Homepage from "./layout/Menubar_Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';

const PO = props => (
    <tr>
      <td>{props.po.company.name}</td>
      <td>{props.po.company.url}</td>
      <td>{props.po.subteam}</td>
      <td>{props.po.owner}</td>
      <td>${props.po.total_cost}</td>
      <td><Link to={"/po_info" + props.po._id}>More Information</Link></td>
      <td>{props.po.status}</td>
      {jwt_decode(global.localStorage.getItem("jwtToken")).role == "admin" && 
            <td>
                <div>
                    <Link to={"/upgradeStatus" + props.po._id}>
                        Upgrade Status
                    </Link>
                </div>
                
                <div>
                    <Link to={"/removePO" + props.po._id}>
                        Remove
                    </Link>
                </div>
            </td>
      }
    </tr>
  )

export default class Order extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            POs: [],
            err: [],
            name: "",
            email: "",
            role: "",
            subteam: "",
            logged_in: false
        }
    }
    componentDidMount() {
        try {
            const user = jwt_decode(global.localStorage.getItem("jwtToken"));
            this.setState({name: user.name, email: user.email, role: user.role, subteam: user.subteam, logged_in: true});
            if (user.role == "admin") {
                axios.get("/api/po")
                .then(response => {
                    this.setState({POs: response.data.data});
                })
                .catch(err => {
                    console.log(err);
                })
            }
            else {
                axios.get("/api/po/owner" + user.email)
                .then(response => {
                    this.setState({POs: response.data.data});
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
        catch (err) {
            console.log(err);
        }
        
    }

    upgradeStatus(id) {
        axios.post("/api/upgradeStatus", {id: id}).then(res => {
            console.log(res);
        })
    }

    poList() {
        return this.state.POs.map(function(currentPO, i) {
            return <PO po={currentPO} key={i} />;
        })
    }
    render() {
        if (this.state.logged_in) {
            return (
                <div style={{ fontFamily: "montserrat" }}>
                    <Menubar/>
                    <h1 style={{ float: "left", marginTop: "2rem", marginLeft: "5rem" }}>
                        <strong>Purchase Orders</strong>
                    </h1>
                    {this.state.POs != null ? 
                    <table className="table table-bordered col-md-10" 
                        style={{ margin: "10rem", marginTop: "7rem", marginBottom: "1rem" }}
                    >
                        <thead class="thead-light">
                            <tr>
                                <th>Company Name</th>
                                <th>Company URL</th>
                                <th>Subteam</th>
                                <th>Owner</th>
                                <th>Total Cost</th>
                                <th>Actions</th>
                                <th>Status</th>
                                {this.state.role == "admin" && <th>Admin Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            { this.poList() }
                        </tbody>
                    </table>
                        : <body>There are currently no POs</body>}
                    <div style={{ marginBottom: "30px" }}>
                        <Link to={"/po_form"} style={{ marginLeft: "10rem", marginBottom: "1rem" }}>
                            <button className="btn btn-outline-secondary">Create New PO</button>
                        </Link>
                     </div>
                </div>
            )
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
    };
}