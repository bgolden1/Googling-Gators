import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
const UserProfile = require("../../../auth/User");
const axios = require("axios");
const qs = require('querystring');

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

class Register extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Formik initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    repeat_password: '',
                    subteam: ''
                  }}
                          validationSchema={SignupSchema}
                          onSubmit={(values, actions) => {
                            console.log("submit", values);
                            delete values.repeat_password;
                            axios.post('/auth/signup', values).then(function (response) {
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
                      <h1>Signup</h1>
                      <p className="text-muted">Create your Gatorloop account:</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="name"
                               placeholder="Name"
                               autoComplete="name"
                               id="name"
                               name="name"
                               onChange={handleChange}
                               value={values.name} />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="email"
                               placeholder="Email"
                               autoComplete="email"
                               id="email"
                               name="email"
                               onChange={handleChange}
                               value={values.email} />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                               placeholder="Password"
                               id="password"
                               name="password"
                               onChange={handleChange}
                               value={values.password} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                               placeholder="Repeat Password"
                               id="repeat_password"
                               name="repeat_password"
                               onChange={handleChange}
                               value={values.repeat_password} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="select"
                               placeholder="Select a team"
                               id="subteam"
                               name="subteam"
                               onChange={handleChange}
                               value={values.subteam} >
                          <option value="none">Select a team</option>
                          <option value="ece">Electrical</option>
                          <option value="mech">Mechanical</option>
                        </Input>
                      </InputGroup>
                      <Button color="success" block>Create Account</Button>
                    </Form>

                    )}
                  </Formik>
                </CardBody>
                <CardFooter className="p-4">
                  <p className="text-muted">Already have an account? <Link to='/login'>Click here to login.</Link></p>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
