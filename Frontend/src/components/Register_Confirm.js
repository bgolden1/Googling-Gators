import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class Register_Confirm extends Component {
    
    render() {
        return (
            <div class="text-center" style={{ marginTop: "12rem" }}>
                <h1> Your registration has been sent to get approved.</h1>
                <h3><small class="text-muted">You will receive an email once an administrator comfirms your registration.</small></h3>

                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <Link to="/">
                        <button
                            style={{
                                width: "200px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "2rem"
                            }}
                            className="btn btn-primary btn-lg"
                        >
                            Return to Home
                                 </button>
                    </Link>


                </div>

            </div>
        );
    }
}

export default Register_Confirm;