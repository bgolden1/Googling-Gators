import React, { Component } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'



const Part = props => (
    <tr>
      <td>{props.part.name}</td>
      <td>{props.part.description}</td>
      <td>{props.part.quantity_available}</td>
      <td>{props.part.total_quantity}</td>
      <td>{props.part.last_checked_out}</td>
      <td><Button 
            style={{
                width: "150px",
                borderRadius: "1px",
                letterSpacing: "1.5px",
                marginTop: "0rem"
            }}
            type="button"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            onClick={Inventory_Page.onClick}
            >Checkout</Button></td>
    </tr>
  )

class Inventory_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            errors: {}
        };
    }

    onClick(id) {
        axios.post("http://localhost:8080/api/parts");
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/parts")
            .then(response => {
                this.setState({parts: response.data.data});
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
                <h3>Parts List</h3>
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
}

export default Inventory_Page;