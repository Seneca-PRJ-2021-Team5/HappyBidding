/* Library */
import React, {useState } from 'react';              //read react
import { useMediaQuery } from "react-responsive";
/* CSS */
import './css/login.css';
/* Image */
import logoPic from './img/logo.png';
import biddingPic from './img/bidding.png';
import { withRouter } from 'react-router-dom';

//function component
function Login(props){ 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const [values, setValues] = useState({
        username: "",
        password: "",
        type:"",
        showError: false,
        eMessage: ""
    });

    //it change value when user input value
    function handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    }

    //it works if user click "Trouble logging in?"
    function handleClick(){
        props.history.push({
        pathname: '/recoveryAccount',
        //this.props.location.state.username on dashboard.js
        state: { username: values.username }
    });

  }

  var myHeaders = new Headers({
    'Authorization': 'Token ' + process.env.API_TOKEN,
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  //it work when user submit a form
  function handleSubmit(event){
    console.log(values.username)
    console.log(values.password)

    fetch(`https://happybiddingserve.herokuapp.com/api/user?emailAddress=${values.username}&password=${values.password}`)
    .then((res) => {
        return res.json();
    })
    .then(data => {  //data = res.json
            if(data.message.includes("SUCCESS")){  
                setValues({ ...values, showError:false });
                props.setUserLoginStatus(data.userType, values)
                props.history.push({
                    pathname: '/profile',
                    //this.props.location.state.username on dashboard.js
                    state: { username: values.username}
                });
            }else{
                setValues({ showError: true, username: '', password: '', eMessage: "Username or Password is wrong."  });
            }
        }).catch(()=>{
            setValues({ showError: true, username: '', password: '', eMessage: "Username or Password is wrong."  });
        });

        event.preventDefault();
  }

  //return page body
  //min-width: 768px => for PC
   return (
        <div className="loginContainer">
            <div id="top"></div>
            <div id="login_leftSide">
        
            {isTabletOrMobile?null:<img src={biddingPic} alt="happy bidding" />}
            </div>
            <div id="login_rightSide">
            <img id="login_logo" src={logoPic} alt="Happy Bidding Logo" />
               <div>
                    <form className="loginForm" onSubmit={handleSubmit}>
                        { values.showError ?  <span id="errorTextArea">{values.eMessage}</span> :  <span id="noErrorArea"></span> }
 
                        <label> <div className="login_label">User Name</div><br />
                            <input  className="login_inputarea" name="username" placeholder="username" type="text" value={values.username} onChange={handleInputChange} />
                        </label> <br />
                        <label><div className="login_label"> Password</div><br />
                            <input className="login_inputarea" name="password" placeholder="password" type="password" value={values.password} onChange={handleInputChange} />
                        </label><br />
                        <input id="login_sButton" type="submit" value="Sign in" /><br />
                        <label onClick={handleClick}>Trouble logging in?</label>

                    </form>
                </div>
            </div>
        </div>
    );
}

 
export default withRouter(Login);  