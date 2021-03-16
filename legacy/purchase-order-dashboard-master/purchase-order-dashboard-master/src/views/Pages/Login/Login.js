import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import logo from "../../../assets/img/brand/logo.png";
import { AppNavbarBrand } from "@coreui/react";
const UserProfile = require('../../../auth/User');
const axios = require("axios");
const qs = require('querystring');

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <AppNavbarBrand
                      full={{ src: logo, width: 150, height: 60, alt: 'Logo' }}
                      /*minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}*/
                    />
                    <h3>Purchase Orders Login</h3>
                    <Formik
                      initialValues={{
                        email: '',
                        password: ''
                      }}
                      validationSchema={SigninSchema}
                      onSubmit={(values, actions) => {
                        console.log("submit");
                        axios.post('/auth/login', qs.stringify({
                            email: values.email,
                            password: values.password
                          }), {
                            header: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                            }
                          }
                        ).then(function (response) {
                          console.log("response", response);
                          UserProfile.setUser(response.data.data);
                          this.props.history.push('/dashboard');
                        }.bind(this))
                          .catch(function (error) {
                            // handle error
                            console.log("error", error);
                            actions.setSubmitting(false);
                            actions.setFieldError("general", "There was an error with your request, please try again.");
                          });
                      }}
                    >
                      {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                        }) => (

                        <Form onSubmit={handleSubmit}>

                          <ErrorMessage id="general" name="general" />
                          <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your email"
                              autoComplete="email"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              value={values.email} />

                            <ErrorMessage name="email" />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              autoComplete="current-password"
                              id="password"
                              name="password"
                              onChange={handleChange}
                              value={values.password} />

                            <ErrorMessage name="password" />

                          </Form.Group>

                          <Form.Group>
                          <Button variant="primary" type="submit" disabled={isSubmitting}
                            >
                            {isSubmitting ? "Please wait..." : "Login"}</Button>
                          </Form.Group>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div className="card-body">
                      <h2>Sign up</h2>
                      <p>Welcome to the Gatorloop Purchase Order system. Need to order materials and supplies? Create an account to submit a request.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
