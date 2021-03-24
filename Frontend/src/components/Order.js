import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";
import jwt_decode from "jwt-decode";
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
                <Link to={"/upgradeStatus" + props.po._id}>
                    Upgrade Status
                </Link>
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
            role: "",
            subteam: "",
            logged_in: false
        }
    }
    componentDidMount() {
        try {
            const user = jwt_decode(global.localStorage.getItem("jwtToken"));
            this.setState({name: user.name, role: user.role, subteam: user.subteam, logged_in: true});
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
                axios.get("/api/po/owner" + user.name)
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
                <div>
                    <Menubar/>
                    <h3 style={{ marginLeft: "2rem" }}>POs List</h3>
                    {this.state.POs != null ? 
                    <table className="table table-striped" style={{ margin: 30 }} >
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Company URL</th>
                                <th>Subteam</th>
                                <th>Owner</th>
                                <th>Total Cost</th>
                                <th>Actions</th>
                                <th>Status</th>
                                {this.state.role == "admin" && <th>Upgrade</th>}
                            </tr>
                        </thead>
                        <tbody>
                            { this.poList() }
                        </tbody>
                    </table>
                    : <body>There are currently no POs</body>}
                    <Link to={"/po_form"} style={{ marginLeft: "2rem" }}>Create New PO</Link>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Error: Not Logged In</h3>
                    <Link 
                        to="/login"
                        style={{fontFamily: "montserrat"}}
                        className="col s5 brand-logo center black-text">
                        Return to Login Page
                    </Link>
                </div>
            );
        }
    };
}