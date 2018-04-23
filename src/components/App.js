/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Callback from './Callback';
import NotFoundPage from './NotFoundPage';
import Auth from '../services/Auth';
import ToDo from './ToDo/ToDo'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}


const App = () =>(
  <div className="fullHeight">
    <Switch>
      <Route exact path="/" render={(props)=><LandingPage auth={auth} {...props}/>}/>
      <Route exact path="/ToDo" render={(props)=><ToDo auth={auth} {...props}/>}/>
      <Route exact path="/callBack" render={(props)=>{
        handleAuthentication(props);
        return <Callback {...props}/>;
      }} />
      
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
