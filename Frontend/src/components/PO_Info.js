import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";

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
            err: []
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
    }

    partsList() {
        return this.state.parts.map(function(currentPart, i) {
            return <Part part={currentPart} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <Menubar/>
                <h2>PO #{this.state.id}</h2>
                <h3>Parts Requested</h3>
                <table className="table table-striped" style={{ margin: 30 }} >
                    <thead>
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
}