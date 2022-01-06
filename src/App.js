import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Login from './Login/Login.component';
import Dashboard from './Dashboard/Dashboard.component';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="router-container">
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
