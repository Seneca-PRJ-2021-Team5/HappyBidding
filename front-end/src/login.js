import React from 'react';              //read react
import './css/login.css';
class login extends React.Component {   //inherit react.component to this page
    constructor(props) {
        super(props);
        this.state = {
            username: "username",
            password: "password"
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]:value});
      }
    
      handleSubmit(event) {
        const username = this.state.username;
        const password = this.state.password;

        if(username==="prj@prj.ca"){
            alert("user SUCCESS")
            if(password==="password123"){
                alert("password SUCCESS")
            }else{
                alert("PASS WRONG")
            }
        }else{
            alert("FAILED")
        }
        event.preventDefault();
      }
    
    
    render() {                          //declare render to display
        return (
            <div class="loginContainer">
                <div id="top"></div>
                <div id="leftSide">
                    <img src="img/bidding.png" alt="bidding image picture" />
                </div>
                <div id="rightSide">
                    <img src="img/logo.png" alt="Happy Bidding Logo" />
                    <div>
                        <form class="loginForm" onSubmit={this.handleSubmit}>
                            <label> <div id="login_label">User Name</div><br />
                                <input  id="inputarea" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                            </label> <br />
                            <label><div id="login_label"> Password</div><br />
                                <input id="inputarea" name="password" type="text" value={this.state.password} onChange={this.handleInputChange} />
                            </label><br />
                            <input id="login_sButton" type="submit" value="Sign in" /><br />
                            Trouble logging in?
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default login;  