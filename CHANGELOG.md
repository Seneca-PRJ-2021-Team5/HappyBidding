## IMPORTANT - PLEASE INSTALL THE FOLLOWING:
BEFORE INSTALLING: **Make sure you are in "front-end" folder**
| Package Added           | Date Added    | For What? | Command for installation              | Specific page      |
| ----------------------- |:-------------:| :--------:| ------------------------------------- | ------------------ |
| react-bootstrap         | 2021/06/06    | Frontend  | npm install react-bootstrap bootstrap |  |
| react-router-bootstrap  | 2021/06/07    | Frontend  | npm install react-router-bootstrap    |  |
| @material-ui/core       | 2021/06/20    | Frontend  | npm install  @material-ui/core        | UserManageAuction  |
| react-chat-elements     | 2021/06/21    | Frontend  | npm install react-chat-elements       | synchAuctionChat   |
| socket.io-client        | 2021/06/21    | Frontend  | npm install socket.io-client          | synchAuctionChat   |
| gmail-send              | 2021/07/13    | Backend   | npm install --save gmail-send         | data-service.js    |

## Notes
### ABOUT CSS in react
All components see all css.  
React couldn't have any function to choose specific css for specific component.  
That means be careful to decide id and class name.  
If you add the same name in diff files, page will load diff file's css.   
<br>


## CHANGELOG HISTORY     

#### 2021/07/03 - Arhur      
\- App.css: Fixed the position of the footer        
\- profileSideBar.js: Added the side bar to have a minimum height in order to fix the footer on the bottom        
\- login.js: Added Bootstraop to display ta dynamic label for the input fields          
\- App.js: Added the class to set the minimum height to the page         
\- CreateNewAuction.js: Added dropdown for auction cathegories, and restricted the price to be typed only with numbers        
\- UserManageAuction.js: Created the functionality to allow the user to edit an auction, Created function to save auctions' changes and persist to database          
\- server.js: Created route to save the changes from a specific auction            
\- data-service.js: Created function to update Auctions' information into database         
        
#### 2021/08/08 - Adam   
\- index.html: included script tag to include the paypal jdk  
\- PaymentIntegration.js: code implements the PayPal button which redirects user to third party application to pay for auction  
\- UserManageAuction.js: added PaymentIntegration component, which is only rendered if the the client is of user type  
\- UserManageAuction.js: If auction is set as Ongoing, a button will appear next to auction that redirects user to synchronous auction page with auction details  
\- synchAuctionChat.js: user can now join a specific room which is dedicated to the auction they are viewing  

#### 2021/08/07 - Adam  
\- server.js: added route to get an auction by its id from the database  
\- data-service.js: added method to find an auction by its id and return it to the client  

#### 2021/07/31 - Arhur    
\- data-service.js: Fixed auctoin deletion route. Now Users that are registered to the auction that is about to be deleted will have that auction removed from their auction manage list       
\- login (.js, .css): made recover button to have more tendency to be pressed             

#### 2021/07/27 - Megumi  
\- bid.js: Fixed array problem. I think it works correctly, but without DB yet   

#### 2021/07/27 - Megumi  
\- UserManageAuction.js: Fixed submit button in report problem's text to Send from close deletion  
  
#### 2021/07/27 - Arhur      
\- UserManageAuction.js: Commented some code part. Auctioneer is able to delete an auction from the auction list OBS:. THERE IS STILL PARTS TO BE FIXED ABOUT USER MANAGE AUCTIONS LIST       
       


#### 2021/07/25 - Megumi  
\- Profile.js -> Overview.js and PayInfo.js  
sepalated Profile.js to 3 files (Profile.js, Overview.js and PayInfo.js)


    
#### 2021/07/24 - Arhur     
\- Notifications.js: Added functionality to update localy the list of notifications. If a notification is replied, then it will disappear from the local list and the dababase list as well       
\- UserManageAuction.js: Added the heroku api route to allow deletion         
\- profile.js: Removed unecessary console.logs. Inserted new props to be sent to SideBar component         
\- profileSideBar.js: added all auctions to be sent to the userManageAuction component to be seen by the Auctioneer       
\- UserManageAuction.js: Added functionality to allow auctioneer to delete a specific auction from the auction list       
\- server.js: Created route for deleting an auction        
\- data-service.js: Created function to delete a specific auction from database       


#### 2021/07/23 - Arhur
\- Notifications.js: Created the states "replyDescription", "selectedProblem", "showReplyProblem". Created a React Bootstrap Modal in order to have a pop-up to reply a problem. Created functions for the modal functionality closeReplyProblem, handleChange, replyProblem, sendResponse.      


#### 2021/07/22 - Arhur      
\- Notifications.js: created getProblemList function to filter those auctions who has problems reports. Fixed functionality to display the list of problems reported in the table. Removed the Fetch for Auctions and placed the code into profile.js component. removed also unecessary code. Changed the key for each one of the records in the Notifications'table to be the id that is auto generated by mongoDB for each one of the elements in the problemList array.        

    
\- profile.js: Inserted the code for fetching the problem list in order to populate the notifications' table in the Notifications.js component. It passes data to the side bar, then the side bar will pass the problem list to Notifications components               
       
\- profileSideBar.js: Inserted in the link for the route of notifications component, the list of problemList that comes from props       
\- server.js: created post request to reply a problem        
\- data-service.js: Added a message to be displayed in console.log for the reportProblem function, in order to confirm if a problem was successfully reported. Created replyProblem function to allow auctioneer to reply a problem from within Notification list    


#### 2021/07/20 - Megumi
\- asyncAuction.js:        
added to display asyncAuction, but only layout.

\- DisplayTimeLimit.js:  
added it to display time limit in asyncAuction.  

\- asyncAuction.css:  
added for asyncAuction's css   

\- App.js:  
Added asyncAuction to the menu bar and route  

\- Clock.png:  
Using for asyncAuction Time limit. it is in img folder.  


#### 2021/07/20 - Arhur
\- Notifications.js:      
Component created to display the problems regarding Auctions     
__OBS:.__ Notification page has an issue that is not displaying the data that is fetched. __IT NEEDS TO BE FIXED__       

\- App.js:      
Added Notification component to the route list, and start using Sessions Cookies in the page     

\- HomePage.js:        
Added Alert Welcome Message for Users who are logged in the system     

\- login.js:       
Added more cookie creation to the sessions, and changed the login redirection to Home page instead of user profile       

\- profile.js:        
Removed unecessary code        

\- signup.js:        
Fixed Validation for signup        

\- UserManageAuction.js:        
Fixed auction listing        

\- profileSideBar.js:         
Removed unecessary code, and added useEffect to load the component        

\- server.js:         
Created route to allow user to report a problem regarding an auction        

\- auctionSchema.js:         
Added user first name, last name and email addres to the problem list field        

\- data-service.js:          
Created reportProblem function to allow users to report problems regarding specific auctions       

#### 2021/07/19 - Arhur
\- signup.js:        
fixed validation form. pop up error message created     
Added validation for filtering special characters      

#### 2021/07/13 - Arhur   
\- created POST route to update user       
\- installed gmail-send to send emails to users        
\- set default values to creditCard schema      
\- created updateUser function, created accountRecover function         
\- created recovery account component         
\- created the functionality to allow the user to update its profile     


#### 2021/07/12 - Megumi
\- Created Recovery Account page and Recovery Completed page(to display notification message to send email for user.)   
\- Created css for Recovery Account page.  
\- Added First name and Last name column in Signup page.  
\- Removed id from all columns in signup page cuz css never uses these ids.  
\- Added Routes for Recovery Account and Recovery Completed page in App.js  
\- Add Notes in this page.  

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
\- User manage auction backend completed.<br>
\- Added route in server.js which will be called everytime a user registers to an auction.<br>
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

