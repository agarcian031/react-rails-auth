import React from 'react';
import {Route, Redirect} from 'react-router-dom'; 
import {AuthConsumer, } from '../providers/AuthProvider'; 


const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <AuthConsumer>
      {auth => 
        <Route
          {...rest} //exact path etc. 
          // props: location, match, history, etc. 
          render={ reactRouterProps => (
            auth.authenticated ? 
            <Component {...reactRouterProps} /> 
            :
            <Redirect to={{
              pathname: "/login", 
              state: {from: reactRouterProps.location}
            }}/>
            // ^^ lets you know where this route came from. 

          )}
        />
      }
    </AuthConsumer>
  )
}

export default ProtectedRoute;
