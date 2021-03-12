import React, { Component, lazy, Suspense } from 'react';
import ViewComponent from '../ViewComponent'
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";
const axios = require("axios");


class AdminDashboard extends ViewComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  async getData() {

    await axios.get('/api/po', {
      withCredentials: true
    })
      .then(function (response) {
        console.log("get response", response);
        if (response.data.success && this._isMounted) {
          this.setState({data:response.data.data})
        }
      }.bind(this))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  componentDidMount() {
    super.componentDidMount();
    this.getData();
  }

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
                All Active Purchase Orders
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="m">
                  <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Owner</th>
                    <th>Subteam</th>
                    <th>Date Created</th>
                    <th>Status</th>
                    <th>Deadline</th>
                    <th>Cost</th>
                    <th></th>
                  </tr>
                  </thead>

                  <tbody>
                  <Suspense  fallback={this.loading()}>
                  </Suspense>

                  {this.state.data.map(function(item, key) {

                    return (
                      <tr key = {key}>
                        <td>{item.po_number}</td>
                        <td>{item.owner}</td>
                        <td>{item.subteam}</td>
                        <td>{item.date_created.substring(0, item.date_created.indexOf('T'))}</td>
                        <td><Badge color="warning">{item.status}</Badge></td>
                        <td>{item.deadline}</td>
                        <td>${item.total_price}</td>
                        <td>Details</td>
                      </tr>
                    )

                  })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col>
            <Card>
              <Suspense  fallback={this.loading()}>
              </Suspense>
              <CardHeader>
                Manage Users
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

export default AdminDashboard;
