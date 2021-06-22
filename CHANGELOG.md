## IMPORTANT - PLEASE INSTALL THE FOLLOWING:
BEFORE INSTALLING: **Make sure you are in "front-end" folder**
| Package Added           | Date Added    | For What? | Command for installation              | Specific page      |
| ----------------------- |:-------------:| :--------:| ------------------------------------- | ------------------ |
| react-responsive        | 2021/06/03    | Frontend  | npm install react-responsive          |  |
| react-bootstrap         | 2021/06/06    | Frontend  | npm install react-bootstrap bootstrap |  |
| react-router-bootstrap  | 2021/06/07    | Frontend  | npm install react-router-bootstrap    |  |
| @material-ui/core       | 2021/06/20    | Frontend  | npm install  @material-ui/core        | UserManageAuction  |
| react-chat-elements     | 2021/06/21    | Frontend  | npm install react-chat-elements       | synchAuctionChat   |

<br>


## CHANGELOG HISTORY

#### 2021/06/20 - Megumi
\- Created front-end for synchronous auction
#### 2021/06/14 - Megumi
\- Added profile on Navigation bar  
\- Replaced main function name in profile.js from AuctioneerProfile to Profile

#### 2021/06/07 - Leonel
\- Worked improving the user profile page front-end.
\- Merged changes into main branch in GitHub.

#### 2021/06/07 - Henry
\- Merge branch 'serverDevelopment' into main.   
\- update auctionSchema.   
\- create getAllAuctions and addNewAuction.  
\- create get/post for auctiosn   

#### 2021/06/07 - Arthur  
\- Created slider item component for Homepage.  
\- installed "react-router-bootstrap" for the navigation bar to work  
\- Added the Navigation bar inside  BrowserRouter  
\- Created NavigationBar component in order to display the navigation bar at the to of the page  
\- Created the version 1 of the Slider component  
\- Inserted the Slider component in the HomePage  
\- Added a heart emoji in the name of the navigation bar  
\- Added bronken heart emoji to NotFound page  
\- In App component, all imported components were change their names to start with UPPERCASE (React standard). For Example:  
   ```javascript 
   import login from './login'; // INSTEAD OF THIS 
   import Login from './login'; // IT SHOULD BE THIS
   ```   
\- Renamed file profileSideBar.js because it was getting typo error in the code: "profileSIdeBar.js" (old name) to "profileSideBar.js" (new name)  


#### 2021/06/06 - Arthur  
\- Created HomePage component (still needs to develop)  
\- Created NotFound component (still needs to develop)  
\- Added HomePage and NotFound pages in the Route in App component  

#### 2021/06/03 - Megumi
\- Created Mobile profile page  
  
#### 2021/06/01 - Arthur 
\- For the server, updated the route route name from "**/api/users**" to "**/api/user**"    
<br>

#### Before 2021/06/01 
#### -----> Adam
##### Signup Front end
\- Created inputs for the user to insert data   
\- Created Signup.css to make the style of the signup page    
\- Included API POST request for the fetch in order to persist data into the database using the API through the signup form    
\- Created a redirect to the login page after the signup form was submitted    
    
#### -----> Megumi 
##### Signup, Login page:  
\- change class component to functional component  
\- fix page for responsible page    
##### AuctioneerProfile(Profile page):    
\- just design, didnt do anything about backend   
\- that include User profile(not auctioneer) too.  
##### Dashboard, RecoveryAccount   
\- nothing    

#### 2021/05/31 - Leonel
\- Worked along with Megumi in the front-end of User Login Page.
\- Created the HappyBidding Heroku Account.

