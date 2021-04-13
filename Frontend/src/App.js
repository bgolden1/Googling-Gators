import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Add additional routes here
import Homepage from './components/Homepage';
import Login_Page from './components/Login_Page';
import Register_Page from './components/Register_Page';
import Register_Confirm from './components/Register_Confirm';
import Dashboard from './components/Dashboard';
import Inventory_Page from './components/Inventory_Page';
import Checkout from "./components/Checkout";
import Checkin from "./components/Checkin";
import Order from "./components/Order";
import PO_Info from "./components/PO_Info";
import PO_Form from "./components/PO_Form";
import Settings_Page from './components/Settings_Page';
import Logout from './components/Logout';
import UpgradeStatus from './components/UpgradeStatus';
import RemovePart from './components/RemovePart';
import RemovePO from './components/RemovePO';
import AddPart from './components/AddPart';


function App() {
    return (
        <Router>
            <Switch>
                // Add additional routes here
                <Route exact path="/" component={Homepage} />
                <Route path="/login" component={Login_Page} />
                <Route path="/register" component={Register_Page} />
                <Route path="/confirm" component={Register_Confirm}/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/inventory_page" component={Inventory_Page} />
                <Route path="/checkout:name" component={Checkout} />
                <Route path="/checkin:name" component={Checkin} />
                <Route path="/order" component={Order} />
                <Route path="/po_info:id" component={PO_Info} />
                <Route path="/po_form" component={PO_Form} />
                <Route path="/settings" component={Settings_Page} />
                <Route path="/logout" component={Logout} />
                <Route path="/upgradeStatus:id" component={UpgradeStatus} />
                <Route path="/removePart:name" component={RemovePart} />
                <Route path="/removePO:id" component={RemovePO} />
                <Route path="/add" component={AddPart} />
            </Switch>
        </Router>
    );

}

export default App
