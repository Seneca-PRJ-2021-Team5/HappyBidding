/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import '../../css/sideBar.css';
import { withRouter } from 'react-router-dom';
import { Col } from 'react-bootstrap'


//function component
function Sidebar(props){ 
    const [values, setValues] = useState({
        usertype: "",
        username: "",
        password: "",
        showError: false,
        eMessage: ""
    });

    //it works if user click "Trouble logging in?"
    function handleOverViewClick(){
        props.history.push({
            pathname: '/profile',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

    //it works if user click "Trouble logging in?"
    function handleCreateAuctionClick(){
        props.history.push({
            pathname: '/createAuction',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

    //it works if user click "Trouble logging in?"
    function handleManageAuctionClick(){
        props.history.push({
            pathname: '/manageAuction',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

    //it works if user click "Trouble logging in?"
    function handleNotificationClick(){
        props.history.push({
            pathname: '/notification',
            //this.props.location.state.username on dashboard.js
            state: { username: values.username }
        });
    }

   return (
    <>
        <div className="sideBarButton" onClick={handleOverViewClick}>Profile Overview</div>
        <div className="sideBarButton" onClick={handleManageAuctionClick}>Manage Auction</div>
        {values.userType == "auctioneer" && 
        (
            <>
                <div className="sideBarButton" onClick={handleCreateAuctionClick}>Create Auction</div>
                <div className="sideBarButton" onClick={handleNotificationClick}>Notification</div>
            </>
        )}
    </>
    );
}

 
export default withRouter(Sidebar);  
