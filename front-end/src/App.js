import './App.css';

import React from 'react'; //import react
//import react-router-dom to use BrowserRouter, route, switch to move page
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import login from './login'; //import login.js 
 
 
class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={login} />　//when user specify /login, go to login page
        </Switch>
      </BrowserRouter>
    );
  };
}
 
export default App;
