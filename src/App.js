import React, { Component } from 'react';
import {BrowserRouter,Switch,Route}  from 'react-router-dom';
import './App.css';

import Login from './Components/Login/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
