/* Library */
import React, {useState} from 'react';              //read react
/* CSS */
import '../../css/sideBar.css';


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
            pathname: '/overView',
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

    function AuctioneerMenu(){
        return (
            <React.Fragment>
            <div onClick={handleCreateAuctionClick}>Create Auction</div>
            <div onClick={handleNotificationClick}>Notification</div>
            </React.Fragment>
        );
    }
  //return page body
  //min-width: 768px => for PC
   return (
        <div className="SideBar">
            <div id="SideBarMenu">
                <div onClick={handleOverViewClick}>Overview</div>
                <div onClick={handleManageAuctionClick}>Manage Auction</div>
                {(values.usertype!="user"?<AuctioneerMenu/>: null)}
            </div>

        </div>
    );
}

 
export default Sidebar;  
