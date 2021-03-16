import React, { Component, lazy, Suspense } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";
import ViewComponent from "../ViewComponent";
const axios = require("axios");


class CreateOrder extends ViewComponent {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <Suspense  fallback={this.loading()}>
              </Suspense>
              <CardHeader>
                Create Purchase Order
              </CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateOrder;
