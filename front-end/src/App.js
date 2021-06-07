
import React from 'react'; //import react
//import react-router-dom to use BrowserRouter, route, switch to move page
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './login'; //import login.js 
import Dashboard from './dashboard'; //import dashboard.js 
import RecoveryAccount from './recoveryAccount'; //import dashboard.js 
import Signup from './signup';
import Profile from './profile';
import HomePage from './HomePage'
import NotFound from './NotFound'
import NavigationBar from './components/NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css';
 
class App extends React.Component {
  render(){
    return(
      <>
        <BrowserRouter>
          <NavigationBar/>
          <Switch>
            <Route exact path="/" component={HomePage} />　
            <Route exact path="/login" component={Login} />　
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/dashboard" component={Dashboard} />　
            <Route exact path="/recoveryAccount" component={RecoveryAccount} />　
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </>
    );
  };
}
 
export default App;
