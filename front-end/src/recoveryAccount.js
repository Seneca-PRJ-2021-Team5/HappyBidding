/* Library */
import React, {useState } from 'react';              //read react
import { withRouter } from 'react-router-dom';
/* CSS */
import './css/recoveryAccount.css';


function RecoveryAccount(props){ 
    const [values, setValues] = useState({
        emailAddress: ""
    });

    //it change value when user input value
    function handleInputChange(event){
        console.log(values.emailAddress)
        const name = event.target.name;
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    }
  
  //it work when user submit a form
  function handleSubmit(event){
    console.log(values.emailAddress)
    fetch(`https://happybiddingserve.herokuapp.com/api/user/recover/${values.emailAddress}`, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            props.history.push('/recoveryCompleted')
        })
        .catch(err => console.log(err));

    event.preventDefault();
  }

  //return page body
  //min-width: 768px => for PC
   return (
        <div className="RAContainer ">
                <div className="container card card-container  w-25" >
                    <div className=" mt-4 mb-4">
                    <h2>Recovery Your Account </h2><br/>
                    did you forget your password? <br/>
                    you can recovery your account here!

                    </div>
                    <form className="loginForm mb-4" onSubmit={handleSubmit}>
                        <label> <div className="login_label">User Name</div><br />
                            <input  className="login_inputarea" name="emailAddress" placeholder="email" type="text" value={values.username} onChange={handleInputChange} />
                        </label> <br />

 
                        <input id="login_sButton" type="submit" value="Submit" /><br />
                    </form>
            </div>
        </div>
    );
}
 
export default withRouter(RecoveryAccount)