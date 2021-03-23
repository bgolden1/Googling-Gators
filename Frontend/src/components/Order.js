import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";

const PO = props => (
    <tr>
      <td>{props.po.company.name}</td>
      <td>{props.po.company.url}</td>
      <td>{props.po.subteam}</td>
      <td>{props.po.owner}</td>
      <td>${props.po.total_cost}</td>
      <td><Link to={"/po_info" + props.po._id}>More Information</Link></td>
    </tr>
  )

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            POs: [],
            err: []
        }
    }
    componentDidMount() {
        axios.get("/api/po")
            .then(response => {
                this.setState({POs: response.data.data});
            })
            .catch(err => {
                console.log(err);
            })
    }
    poList() {
        return this.state.POs.map(function(currentPO, i) {
            return <PO po={currentPO} key={i} />;
        })
    }
    render() {
        return (
            <div>
                <Menubar/>
                <h3 style={{ marginLeft: "2rem" }}>POs List</h3>
                <table className="table table-striped" style={{ margin: 30 }} >
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Company URL</th>
                            <th>Subteam</th>
                            <th>Owner</th>
                            <th>Total Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.poList() }
                    </tbody>
                </table>
                <Link to={"/po_form"} style={{ marginLeft: "2rem" }}>Create New PO</Link>
            </div>
        )
    };
}