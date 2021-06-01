import React from 'react'
import './css/signup.css'
import signupPic from './img/signupPic.png';
import logoPic from './img/logo.png';

class signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userType: '',
            userName: '',
            phoneNumber: '',
            emailAddress: '',
            password: '',
            streetNumber: '',
            streetName: '',
            city: '',
            postalCode: '',
            country: ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        const userData = {
            address:{
                streetNumber: this.state.streetNumber,
                streetName: this.state.streetName,
                city: this.state.city,
                postalCode: this.state.postalCode,
                country: this.state.country
            },
            userType: this.state.userType,
            userName: this.state.userName,
            phoneNumber: this.state.phoneNumber,
            emailAddress: this.state.emailAddress,
            password: this.state.password,
          }

          fetch('https://happybiddingserve.herokuapp.com/api/users', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json()) 
          .then(json => console.log(json))
          .catch(err => console.log(err));


/*         alert('Signup form was submitted: ' 
        + this.state.userType + " " 
        + this.state.userName + " " 
        + this.state.phoneNumber + " "
        + this.state.emailAddress + " " 
        + this.state.password + " "
        + this.state.streetNumber + " "
        + this.state.streetName + " "
        + this.state.city + " "
        + this.state.postalCode + " "
        + this.state.country + " "
        ) */
        event.preventDefault();
    }

    render(){
        return(
            <div class="signupContainer">
            <img id="signup_logo"  src={logoPic} alt="Happy Bidding Logo" />
                <div id="signup_formContainer">
                <div id="leftSide">
                <h2>Sign up form</h2>

                <form onSubmit={this.handleSubmit}>
                    <div class="cp_iptxt">
                    <input class="ef" type="text" placeholder="" id="userType" name="userType" value={this.state.userType} onChange={this.handleChange}/>
                    <label>User type</label>
                    <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="text" id="userName" name="userName" value={this.state.userName} onChange={this.handleChange}/>
                    <label>Username</label>
                    <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="text" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange}/>
                    <label>Phone number</label>
                    <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="email" id="email" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange}/>
                    <label>Email</label>
                    <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <label>Password</label>
                    <span class="focus_line"></span>
                    </div>


                    <div class="cp_iptxt">
                    <input  class="ef" type="number" id="streetNumber" name="streetNumber" value={this.state.streetNumber} onChange={this.handleChange}/>
                    <label>Street number</label>
                    <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="text" id="streetName" name="streetName" value={this.state.streetName} onChange={this.handleChange}/>
                    <label>Street name</label>
                    <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="text" id="city" name="city" value={this.state.city} onChange={this.handleChange}/>
                    <label>City</label>
                    <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="text" id="postalCode" name="postalCode" value={this.state.postalCode} onChange={this.handleChange}/>
                    <label>Postal Code</label>
	                <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                    <input class="ef" type="text" id="country" name="country" value={this.state.country} onChange={this.handleChange}/>
                    <label>Country</label>
	                <span class="focus_line"></span>
                    </div>
                    <br/>
                    <input id="signup_sButton" type="submit" value="Submit"/>
                </form>
                </div>
                <div id="rightSide">
                    
                <img id="signupPic" src={signupPic} alt="Happy Bidding signup" />
                </div>
                </div>  
            </div>
            
        )
    }
}

export default signup