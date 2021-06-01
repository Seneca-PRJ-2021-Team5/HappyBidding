import React from 'react';              //read react
import './css/login.css';
class login extends React.Component {   //inherit react.component to this page
    constructor(props) {
        super(props);
        this.state = {
            username: "username",
            password: "password",
            showError: false,
            eMessage: ""
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }

      handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]:value});
      }
    
      handleClick(event){
        this.props.history.push({
            pathname: '/recoveryAccount',
            //this.props.location.state.username on dashboard.js
            state: { username: this.state.username }
        });

      }

      handleSubmit(event) {
        const username = this.state.username;
        const password = this.state.password;
        console.log(username)
        console.log(password)

        fetch(`https://happybiddingserve.herokuapp.com/api/user?emailAddress=${username}&password=${password}`)
        .then((res) => {
            return res.json();
        })
        .then(data => {  //data = res.json
                if(data.message.includes("SUCCESS")){ 
                    this.setState({showResults:false})
                    this.props.history.push({
                        pathname: '/dashboard',
                        //this.props.location.state.username on dashboard.js
                        state: { username: this.state.username }
                    });
                }else{
                    this.setState({ showResults: true, eMessage: "Username or Password is wrong." });
                }
            }).catch((e)=>{
                this.setState({ showResults: true, eMessage: "Username or Password is wrong." });
            });

            event.preventDefault();
      }
    
    
    render() {                          //declare render to display
        return (
            <div class="loginContainer">
                <div id="top"></div>
                <div id="login_leftSide">
                    <img src="img/bidding.png" alt="bidding image" />
                </div>
                <div id="login_rightSide">
                    <img id="login_logo" src="img/logo.png" alt="Happy Bidding Logo" />
                    { this.state.showResults ?  <span id="errorTextArea">{this.state.eMessage}</span> :  <span id="noErrorArea"></span> }
                    <div>
                        <form class="loginForm" onSubmit={this.handleSubmit}>
                            <label> <div id="login_label">User Name</div><br />
                                <input  id="login_inputarea" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                            </label> <br />
                            <label><div id="login_label"> Password</div><br />
                                <input id="login_inputarea" name="password" type="text" value={this.state.password} onChange={this.handleInputChange} />
                            </label><br />
                            <input id="login_sButton" type="submit" value="Sign in" /><br />
                            <label onClick={this.handleClick}>Trouble logging in?</label>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default login;  