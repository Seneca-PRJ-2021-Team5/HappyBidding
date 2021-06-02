/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import './css/sideBar.css';
/* Image */
import logoPic from './img/logo.png';
import biddingPic from './img/bidding.png';


//function component
function Sidebar(props){ 
    const [values, setValues] = useState({
        usertype: "",
        username: "",
        password: "",
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
    function handleOverViewClick(){
        props.history.push({
            pathname: '/recoveryAccount',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

    //it works if user click "Trouble logging in?"
    function handleCreateAuctionClick(){
        props.history.push({
            pathname: '/recoveryAccount',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

    //it works if user click "Trouble logging in?"
    function handleManageAuctionClick(){
        props.history.push({
            pathname: '/recoveryAccount',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

    //it works if user click "Trouble logging in?"
    function handleNotificationClick(){
        props.history.push({
            pathname: '/recoveryAccount',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

    function AuctioneerMenu(){
        return (
            <React.Fragment>
            <div id="cAuction">Create Auction</div>
            <div id="notice">Notification</div>
            </React.Fragment>
        );
    }
  //return page body
  //min-width: 768px => for PC
   return (
        <div class="SideBar">
            <div id="SideBarMenu">
                <div>Overview</div>
                <div>Create Auction</div>
                {(values.usertype!="User"?<AuctioneerMenu/>: null)}
            </div>

        </div>
    );
}

 
export default Sidebar;  