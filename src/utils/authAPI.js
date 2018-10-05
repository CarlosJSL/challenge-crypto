import React from 'react';
import {Route, Redirect}  from 'react-router-dom';


export const auth = {
    isAuthenticated: false,
    authenticate() {
      if(window.localStorage.getItem('user')) this.isAuthenticated = true
    },
    signout() {
      this.isAuthenticated = false
    }
}
  
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        auth.authenticate()

        if (auth.isAuthenticated === true) {
            return <Component {...props} />
        } 

        return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
        }} />
        
    }} />
)