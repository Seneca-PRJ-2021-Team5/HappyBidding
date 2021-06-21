import userPic from '../..//img/userImage.png';
import '../../css/userInfo.css';
 

function UserInfo() {

    return(
        <div class="userInfoArea_pc">
                <img src={userPic} /><br/>
                <label>User Name</label><br/>
                <span>Edit Profile</span>
        </div>
    )
}

export default UserInfo; 