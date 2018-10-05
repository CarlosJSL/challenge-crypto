import React, { Component } from 'react';
import {BrowserRouter,Switch,Route}  from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'

import {chargeDB} from './connectDatabase';

class App extends Component {
  
  async componentDidMount() {
    chargeDB()
  }

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
