import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Add additional routes here
import Homepage from './components/Homepage';
import Login_Page from './components/Login_Page';
import Register_Page from './components/Register_Page';
import Dashboard from './components/Dashboard';
import Inventory_Page from './components/Inventory_Page';
import Checkout from "./components/Checkout";
import Checkin from "./components/Checkin";
import Order from "./components/Order";

function App() {
    return (
        <Router>
            <Switch>
                // Add additional routes here
                <Route exact path="/" component={Homepage} />
                <Route path="/login" component={Login_Page} />
                <Route path="/register" component={Register_Page} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/inventory_page" component={Inventory_Page} />
                <Route path="/checkout:name" component={Checkout} />
                <Route path="/checkin:name" component={Checkin} />
                <Route path="/order" component={Order} />
            </Switch>
        </Router>
    );

  /*return (
    <div className="App">
      <Homepage> </Homepage>
      </div>
  );
  */
}

export default App
