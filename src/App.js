import React, { Component } from 'react';
import {BrowserRouter,Switch,Route, Redirect}  from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import {PrivateRoute} from './utils/authAPI';
import {chargeDB} from './connectDatabase';


class App extends Component {
  
  async componentDidMount() {
    await chargeDB();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <Redirect from="" to="/login" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
