
import React from 'react'; //import react
//import react-router-dom to use BrowserRouter, route, switch to move page
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './login'; //import login.js 
import dashboard from './dashboard'; //import dashboard.js 
import recoveryAccount from './recoveryAccount'; //import dashboard.js 
import signup from './signup';
import profile from './profile';
import HomePage from './HomePage'
import NotFound from './NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
 
class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />　
          <Route exact path="/login" component={login} />　
          <Route exact path="/signup" component={signup}/>
          <Route exact path="/profile" component={profile} />
          <Route exact path="/dashboard" component={dashboard} />　
          <Route exact path="/recoveryAccount" component={recoveryAccount} />　
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  };
}
 
export default App;
