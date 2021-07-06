## IMPORTANT - PLEASE INSTALL THE FOLLOWING:
BEFORE INSTALLING: **Make sure you are in "front-end" folder**
| Package Added           | Date Added    | For What? | Command for installation              | Specific page      |
| ----------------------- |:-------------:| :--------:| ------------------------------------- | ------------------ |
| react-responsive        | 2021/06/03    | Frontend  | npm install react-responsive          |  |
| react-bootstrap         | 2021/06/06    | Frontend  | npm install react-bootstrap bootstrap |  |
| react-router-bootstrap  | 2021/06/07    | Frontend  | npm install react-router-bootstrap    |  |
| @material-ui/core       | 2021/06/20    | Frontend  | npm install  @material-ui/core        | UserManageAuction  |
| react-chat-elements     | 2021/06/21    | Frontend  | npm install react-chat-elements       | synchAuctionChat   |
| socket.io-client        | 2021/06/21    | Frontend  | npm install socket.io-client          | synchAuctionChat   |

<br>


## CHANGELOG HISTORY
#### 2021/07/06 - Arhur 
\- added css for card and user image in the profile component    
\- added createNewAuction to the route listing in App component          
\- created createNewAuction component to allow user to create a new Auction     
\- Set the HomePage component to display the Auctions listed in database, instead of Static data      
\- protected routes from the App component to be accessed by users not logged in the system       
\- added function in the server side to allow user to register to an auction listed in the home page      
\- added auctionId as part of manageAuction array in the user Schema    
\- added validation for the auctionAddToUSerList function in the server side    

#### 2021/07/05 - Arhur 
\- TOP Navbar fixed on the top. Footer added on the bottom     
\- moved the user image and name from payment side to ovewview side in the profile component      

#### 2021/07/05 - Leonel
\- User manage auction backend completed
\- Added route in server.js which will be called everytime a user registers to an auction.
\- Worked on POST "auctionAddToUSerList" function which will add auction to user auctions list once user regiisters to auction.

#### 2021/07/04 - Arhur    
\- Added call back funttion from App.js to be called in case that the user wants to logout from the system     
\- Changed the attribute class to className, and changed id attribute to className (same id name was being called more than 1 time). set the showError state function to be used for triggering the error text box. Call back funtion from App.js is called to pass data to App.js about the user who just logged in. Added withRouter for Login component in order to let it be allowed to pass data to profile component by using props.history.push        
\- Added Sidebar, Overview Profile, and Payment Profile components into profile.js component using React Bootstrap (still need adjustments for the visual).      
\- adjusted some spacing in the code (visual still needs to be adjusted using bootstrap)       
\- Deleted NavigationBar.js component      
\- Organized the code structure and changed the class attribute to be className (React style needed)                   
\- changed the "login_label" and "login_inputarea" from id to class, because they are being used more than once in the code (IDs should only be used in one place, class can be used more than one time)      
\- removed unecessary routes    
\- added css for sidebar buttons    
\- added css for profile overview rows    
\- created css file for TOP navivation bar buttons size     
\- created some css for App.js component      
\- implemented Bootstrap for profile page and SideBar component     
\- created PUT request route to update user profile    

#### 2021/06/22 - Adam
\- Created server side for synchronous auction's live chat

#### 2021/06/20 - Megumi
\- Created front-end for synchronous auction  
\- Fixed some small things

#### 2021/06/22 - Adam
\- Installed socket.io to Server package.json
\- Implemented io connection server side
\- Installed socket.io-client to front-end (check table above)
\- Added Messages component; but not currently functional
\- Added socket functionality to synchAuctionChat

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

