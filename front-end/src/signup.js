import React from 'react'
import './css/signup.css'

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
        alert('Signup form was submitted: ' 
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
        )
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <h2>Sign up form</h2>

                <form onSubmit={this.handleSubmit}>
                    <label>User type:</label><br/>
                    <input type="text" id="userType" name="userType" value={this.state.userType} onChange={this.handleChange}/><br/>

                    <label>Username:</label><br/>
                    <input type="text" id="userName" name="userName" value={this.state.userName} onChange={this.handleChange}/><br/><br/>
                    
                    <label>Phone number:</label><br/>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange}/><br/><br/>

                    <label>Email:</label><br/>
                    <input type="email" id="email" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange}/><br/><br/>

                    <label>Password:</label><br/>
                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/><br/><br/>



                    <label>Street number:</label><br/>
                    <input type="number" id="streetNumber" name="streetNumber" value={this.state.streetNumber} onChange={this.handleChange}/><br/>

                    <label>Street name:</label><br/>
                    <input type="text" id="streetName" name="streetName" value={this.state.streetName} onChange={this.handleChange}/><br/>

                    <label>City:</label><br/>
                    <input type="text" id="city" name="city" value={this.state.city} onChange={this.handleChange}/><br/>

                    <label>Postal Code:</label><br/>
                    <input type="text" id="postalCode" name="postalCode" value={this.state.postalCode} onChange={this.handleChange}/><br/>

                    <label>Country:</label><br/>
                    <input type="text" id="country" name="country" value={this.state.country} onChange={this.handleChange}/><br/>
                    
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default signup