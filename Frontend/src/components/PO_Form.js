import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Menubar from "./layout/Menubar";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import Menubar_Homepage from "./layout/Menubar_Homepage";

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
            completed: false,
            logged_in: false
        };
    }

    componentDidMount() {
        try {
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({owner: decoded.name, subteam: decoded.subteam, logged_in: true})
        }
        catch (err) {
            console.log(err);
        }
    }

    createUI(){
        return this.state.parts.map((el, i) => 
            <div style={{ marginTop: "2rem"}}>
                <div key={i} class="p-2 bg-light border ">
                    <h5>Part #{i + 1}</h5>
            
                    <form class="row g-3 needs-validation">

                <div className="col-md-5">
                    <label class="form-label">Name: </label>
                            <input
                                class="form-control"
                                type="text"
                                placeholder=""
                                name="name"
                                value={this.state.parts[i].name}
                                onChange={this.handleChange(i)} />
                        </div>
                        <div className="col-md-5">
                            <label class="form-label">Quantity: </label>
                            <input
                                class="form-control"
                                type="text"
                                placeholder=""
                                name="quantity"
                                value={this.state.parts[i].quantity}
                                onChange={this.handleChange(i)}/>
                        </div>
                        <div className="col-md-8">
                            <label class="form-label">Description: </label>
                            <input
                                class="form-control"
                                type="text"
                                placeholder=""
                                name="description"
                                value={this.state.parts[i].description}
                                onChange={this.handleChange(i)} />
                        </div>
                        <div className="col-md-5">
                            <label class="form-label">URL: </label>
                            <input
                                class="form-control"
                                type="text"
                                placeholder=""
                                name="url"
                                value={this.state.parts[i].url}
                                onChange={this.handleChange(i)} />
                        </div>
                        <div className="col-md-4">
                            <label class="form-label">Cost per part: </label>
                            <input
                                class="form-control"
                                type="text"
                                placeholder=""
                                name="cost_per"
                                value={this.state.parts[i].cost_per}
                                onChange={this.handleChange(i)} />
                            </div>
               

                        <div className="row" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "100px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                className="btn btn-outline-secondary"
                                onClick={this.handleRemoveRow.bind(this, i)}
                            >
                                Remove
                            </button>
                            
                     </div>

                        </form>
                    


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
        if (this.state.logged_in) {
            if (this.state.completed) {
                return (
                    <Redirect to="/order" />
                );
            }
            return (
                <div>
                    <Menubar />
                    <div className="container" style={{ marginTop: "1rem" }}>

                        <h2>Purchase Order Form</h2>
                        <form class="row g-3 needs-validation" style={{ marginTop: "2rem", marginLeft: "2rem" }} onSubmit={this.onSubmit}>
                            <div className="col-md-4">
                                <label for="company_name" class="form-label">Company Name:</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="company_name"
                                    required
                                    onChange={this.onChange} />
                            </div>
                            <div className="col-md-5">
                                <label for="company_url" class="form-label">Company URL:</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="company_url"
                                    required
                                    onChange={this.onChange} />
                            </div>
                            <div className="col-md-8">
                                <label for="purpose" class="form-label">Purpose: </label>
                                <input
                                    class="form-control"
                                    id="purpose"
                                    required
                                    onChange={this.onChange} />

                            </div>



                            <div>
                                {this.createUI()}
                                <button

                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}

                                    className="btn btn-outline-secondary"
                                    onClick={this.handleAddRow.bind(this)}
                                >
                                    Add Part
                                     </button>

                            </div>

                            <div>

                                <button

                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}

                                    className="btn btn-outline-secondary"
                                    type="submit"
                                >
                                    Submit
                                     </button>

                            </div>

                        </form>
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
        
    }
}