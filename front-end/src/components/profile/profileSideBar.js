/* Library */
import React, {useState, useEffect} from 'react';              //read react
/* CSS */
import '../../css/sideBar.css';
import { withRouter } from 'react-router-dom';
import { Col } from 'react-bootstrap'


//function component
function Sidebar(props){ 
    const [values, setValues] = useState({
        userType: "",
        userName: "",
        showError: false,
        eMessage: ""
    });

    useEffect(() => {
        console.log("USER INFO DATA FROM SIDEBAR:")
        console.log(props.userInfo)

        setValues({...values,
        userType: sessionStorage.getItem("userType"),
        userName: sessionStorage.getItem("userName")
    })
    },[values.userType])

    //it works if user click "Trouble logging in?"
    function handleOverViewClick(){
        props.history.push({
            pathname: '/profile',

        });
    }

    //it works if user click "Trouble logging in?"
    function handleCreateAuctionClick(){
        props.history.push({
            pathname: '/createNewAuction'
        });
    }

    //it works if user click "Trouble logging in?"
    function handleManageAuctionClick(){
        props.history.push({
            pathname: '/userauction'
        });
    }

    //it works if user click "Trouble logging in?"
    function handleNotificationClick(){
        props.history.push({
            pathname: '/notifications'
        });
    }

   return (
    <>
        <div className="sideBarButton" onClick={handleOverViewClick}>Profile Overview</div>
        <div className="sideBarButton" onClick={handleManageAuctionClick}>Manage Auction</div>
        {values.userType == "auctioneer" && 
        (
            <>
                <div className="sideBarButton" onClick={handleCreateAuctionClick}>Create New Auction</div>
                <div className="sideBarButton" onClick={handleNotificationClick}>Notifications</div>
            </>
        )}
    </>
    );
}

 
export default withRouter(Sidebar);  
