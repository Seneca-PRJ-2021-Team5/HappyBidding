/* Library */
import React, {useState } from 'react';              //read react
import { withRouter } from 'react-router-dom';
/* CSS */
import './css/recoveryAccount.css';


function RecoveryCompleted(props){ 

   return (
        <div className="RCContainer ">
                <div className="container card card-container w-50 my-5" >
                    <div className="text-center mx-4 my-4">
                    <h2>Recovery Your Account </h2><br/>
                    if you enter registered email, you will get email from us to recovery account. <br/>
                    Please check your email.

                    </div>
            </div>
        </div>
    );
}
 
export default withRouter(RecoveryCompleted);  