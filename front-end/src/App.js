
import React from 'react'; //import react
//import react-router-dom to use BrowserRouter, route, switch to move page
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './login'; //import login.js 
import dashboard from './dashboard'; //import dashboard.js 
import recoveryAccount from './recoveryAccount'; //import dashboard.js 
import signup from './signup';
import profile from './auctioneerProfile'
 
class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={login} />　//when user specify /login, go to login page
          <Route exact path="/signup" component={signup}/>
          <Route exact path="/profile" component={profile} />　//go to dashboard
          <Route exact path="/dashboard" component={dashboard} />　//go to dashboard
          <Route exact path="/recoveryAccount" component={recoveryAccount} />　//go to dashboard
        </Switch>
      </BrowserRouter>
    );
  };
}
 
export default App;
