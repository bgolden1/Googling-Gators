import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";

export default class PO_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: "",
            company_url: "",
            parts: [{}],
            purpose: "",
            owner: "",
            subteam: "",
            Json: [],
            completed: false
        };
    }

    componentDidMount() {
        const token = global.localStorage.getItem("jwtToken");
        const decoded = jwt_decode(token);
        this.setState({owner: decoded.name, subteam: decoded.subteam})
        console.log(decoded);
    }

    createUI(){
        return this.state.parts.map((el, i) => 
            <div key={i}>
                Part #{i+1}
                <div>
                    Name: 
                    <input type="text" placeholder="part name" name="name" value={this.state.parts[i].name} onChange={this.handleChange(i)} />
                </div>
                <div>
                    Description: 
                    <input type="text" placeholder="part description" name="description" value={this.state.parts[i].description} onChange={this.handleChange(i)} />
                </div>
                <div>
                    URL: 
                    <input type="text" placeholder="part url" name="url" value={this.state.parts[i].url} onChange={this.handleChange(i)} />
                </div>
                <div>
                    Quantity: 
                    <input type="text" placeholder="quantity" name="quantity" value={this.state.parts[i].quantity} onChange={this.handleChange(i)} />
                </div>
                <div>
                    Cost per: 
                    <input type="text" placeholder="cost per" name="cost_per" value={this.state.parts[i].cost_per} onChange={this.handleChange(i)} />
                </div>
                <div>
                    <input type='button' value='remove' onClick={this.handleRemoveRow.bind(this, i)}/>
                </div>
            </div>          
        )
    }

    handleChange = idx => e => {
        const { name, value } = e.target;
        const parts = [...this.state.parts];
        parts[idx][name] = value;
        this.setState({ parts });
    
    };

    handleAddRow = () => {
        const item = {
            name: "",
            description: "",
            url: "",
            quantity: 0,
            cost_per: 0
        };
        this.setState({
            parts: [...this.state.parts, item]
        });
    };
    handleRemoveRow = (idx) => {
        this.state.parts.splice(idx, 1);
        this.setState({ parts: this.state.parts });
    };
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        axios.post("/api/po", {
            "company": {"name": this.state.company_name, "url": this.state.company_url}, 
            "parts": this.state.parts, 
            "purpose": this.state.purpose, 
            "owner": this.state.owner,
            "subteam": this.state.subteam
        })
        .then(function (result) {
            console.log("Request submitted successfully");
        });
        this.setState({completed: true});
    }

    render() {
        if (this.state.completed) {
            return (
            <Redirect to="/order"/>
            );
        }
        return (
            <form style={{ marginTop: "2rem", marginLeft: "2rem" }} onSubmit={this.onSubmit}>
                <div>
                    Company Name:
                    <input type="text" id="company_name" onChange={this.onChange}/>
                </div>
                <div>
                    Company URL:
                    <input type="text" id="company_url" onChange={this.onChange}/>
                </div>
                <div>
                    Purpose: 
                    <input type="text" id="purpose" onChange={this.onChange}/>
                </div>
                <div>
                    {this.createUI()}        
                    <input type='button' value='add more' onClick={this.handleAddRow.bind(this)}/>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        )
    }
}