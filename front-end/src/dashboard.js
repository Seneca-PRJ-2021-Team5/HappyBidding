import React from 'react';              //read react
import './css/login.css';
class dashboard extends React.Component {   //inherit react.component to this page
    constructor(props) {
        super(props);/* 
        this.state = {
            username: "username",
            password: "password"
        }; */
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.props.history.push('/login');
    }
    
    render() {                          //declare render to display
        return (
            <div class="dashboardContainer">
                <div>
                    Welcome User!<br /><br />
                    <input type="button" onClick={this.handleLogout} value="Logout" />
                </div>
            </div>
        );
    }
}
 
export default dashboard;  
