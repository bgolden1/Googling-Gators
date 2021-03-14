import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Add additional routes here
import Homepage from './components/Homepage';
import Login_Page from './components/Login_Page';
import Register_Page from './components/Register_Page';


function App() {
    return (
        <Router>
            <Switch>
                // Add additional routes here
                <Route exact path="/" component={Homepage} />
                <Route path="/login" component={Login_Page} />
                <Route path="/register" component={Register_Page} />
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
