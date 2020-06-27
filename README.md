# Rewards Tracker

## Table of Content
- [Project Demo](#Project-Demo)
- [Application MVP](#Application-MVP)
- [Project Scope](#Project-Scope)
- [Technologies / Dependencies](#Technologies-/-Dependencies)
- [User Stories](#User-Stories)

## Project Demo 
https://mighty-caverns-14844.herokuapp.com/

## Application MVP
- A full stack application using **Node.js, Mongoose, Express and EJS** - backend oriented
- Build based on the **MVC** file structure: Models, Views, Controllers
- Include all **RESTful routes** and a full **CRUD** application.
- Deployed online via **Heroku**

## Project Scope
- Allow users to create, delete, update, view rewards to track individual rewards expiry date. 
- User will also be able to export via PDF, Print and CSV their created rewards.
- To send email notification to Users daily to inform them about their rewards which is near expiring if they happen to have one.
- Sign up/log in functionality, with encrypted passwords and authentication layer
- Reset password functionality, with weblink trigger to user onboarded email addresses
- Ensure application is fully mobile responsive

## Technologies / Dependencies
### 1. EJS
To generate HTML with plain javascript to append to frontend.
### 2. Method-override
To use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
### 3. Bcrypt
To hash and store passwords in database
### 4. PassportJS
To handle authenticate requests
### 5. Mongoose
Database for application, which helps in schema validation, and to translate between objects in code and the representations of those objects in MongoDB
### 6. Connect-flash
Storing of messages, and displaying it on frontend whenever user perform a CRUD operation when being redirected.
### 7. Express-session
- To store the user state with each given being assiged a unique session. 
- Ecrypting cookies
### 8. MomentJS
Wrapper to handle Date object
### 9. DataTables
Enhanced features for HTML table
### 10. Nodemailer
To allow server to send email notification to user
### 11. Node-cron
To schedule daily task on specific timing for server to send email
### 12. Bootstrap
CSS framework for HTML and CSS design templates
### 13. SweetAlert
A replacement for JavaScript's window. alert() function that shows very pretty modal windows. 

## User Stories
# US.1
**As a** avid singapore rewards hunter,
**I want** to have a pleasant looking landing page, with brief description of the website capabilties / updates
### Acceptance Criteria
1. To have 2 section in the landing page
- Home - to have a welcome banner with a brief description of the website capabilities, with a login and register button
- About us - a brief description about the website origin / why it was created, and a change log to inform users of the latest updates
2. A navbar with smooth scrolling effect when click on either **Home** and **About us**
3. A standard design footer
### Dependencies
- Bootstrap for the CSS framework
- EJS - To generate HTML with plain javascript to append to frontend.
### Notes
- 1 day effort, first have to draft up the wireframe / skeleton of the landing page, and to take into consideration which bootstrap component to utilized.
- Setting up a basic express servers with all the dependencies

# US.2
**As a** avid singapore rewards hunter,
**I want** to be able to sign up / login in order to have a customizable / personal rewards tracker
### Acceptance Criteria
- when click on sign up, user will be able to navigate to register page
- when user is at the registration page, user will be able to onboard successfully
- When click on login, user will be navigate to login page
- When user is at login page, user will be able to login successfuly
### Dependencies
- Bootstrap for the CSS framework
- PassportJS - authentication layer
- Mongoose - schema validation and database for application
- Connect-flash - Storing of messages, and displaying it on frontend whenever user perform a CRUD operation when being redirected.
- Express-session - Encrpytion of the cookies
- Bcrypt - Hasing of the password
- Method-override - to avail usage of HTTP verbs for CRUD operation
- EJS - To generate HTML with plain javascript to append to frontend.
### Notes
- Estimated 2 days effort, inclusive of taking database design into consideration, authentication layer, happy and error scenarios, and wireframes for login and signup landing page

# US.3
**As a** avid singapore rewards hunter,
**I want** to be able to navigate to dashboard after a successful login
### Acceptance Criteria
- A welcome banner - With a welcome specific to your onboarded name e.g. Welcome Alvis, a CTA to navigate users to rewards tracking page
- A section with a brief description of what user is able to do and a change log to let user know the latest updates the website has
- A banner with Home, Rewards overview and logout CTA
### Dependencies
- Bootstrap for the CSS framework
- PassportJS - to ensure that this route is accessible when user has logged in, and to seralized / deserialized user when user has logged in / out
- EJS - To generate HTML with plain javascript to append to frontend.
### Notes
- 1 day effort, as database design, authentication layer has been done. Rest of the time spent to come out with the wireframe of the dashboard and rewards overview page.
# US.4
**As a** avid singapore rewards hunter,
**I want** to be able to navigate to rewards overview page to be able to track my rewards expiry date
### Acceptance Criteria
- User will be able to create, update, delete and view their rewards
- All created rewards is to be view in table format, with legends indicating the color used to describe the rewards, green - redeemed, yellow - expiring in 3 days, red - expired, teal - active
- Table is able to sort by aphabtical order / date 
- To have a checkbox for each rewards, when clicked on it the column is to be green, indicating it is redeemed
- When rewards has reached expiry date, the column is to be red, indicating it is expired
- when rewards is expiring in 3 days, the column is to be in yellow, indicating it is expiring soon
- When the rewards has not been redeemed, near expiring, or expired, column is to be display in teal, indiciating it is an active rewards
- Table to have export function, CSV, PDF and print
### Dependencies
- Bootstrap for the CSS framework
- PassportJS - to ensure that this route is accessible when user has logged in, and to seralized / deserialized user when user has logged in / out
- EJS - To generate HTML with plain javascript to append to frontend.
- Datatable - for the enriched functionalities of table
- Mongoose - schema validation and database for application
- Connect-flash - Storing of messages, and displaying it on frontend whenever user perform a CRUD operation when being redirected.
- Express-session - Encrpytion of the cookies
- Method-override - to avail usage of HTTP verbs for CRUD operation
- SweetAlert - A replacement for JavaScript's window. alert() function that shows very pretty modal windows. 
- MomentJS - Wrapper to handle Date object
### Notes
3 Days effort - Ensure all CRUD operations data is flowing to the database in order to append to frontend, to gel in sweetalert for all crud operation modal alert. Ensure that the date is in certain format, in order to sort them by descending / ascending order. To gel in the import function of datatable. Front-End login to display the rewards in certain categories. Custom styling of datatable to make it look more pleasant. Testing of the labeling of rewards, e.g. expiring, expiring soon, active and redeemed.
E2E testing - from registration route all the way to rewards overview CRUD operation. Ensure that all intended excpetion scenario is handled as per expected.
# US.5
**As a** avid singapore rewards hunter,
**I want** to be able to reset my password
### Acceptance Criteria
- Upon clicking on reset password in login landing page user is navigated to reset password landing page to enter designated email for reset
- Upon submiting a valid email for reset password, application will send a unique link for user to change password
- Upon clicking on the unique link, user is able to navigate to change password landing page
- Upon submitting a new password, user will be navigate to login page and be able to login with the new password
### Dependencies
- Bootstrap for the CSS framework
- PassportJS - to ensure that this route is accessible when user has logged in, and to seralized / deserialized user when user has logged in / out
- EJS - To generate HTML with plain javascript to append to frontend.
- Mongoose - schema validation and database for application
- Connect-flash - Storing of messages, and displaying it on frontend whenever user perform a CRUD operation when being redirected.
- Express-session - Encrpytion of the cookies
- NodeMailer - To allow server to send email to user
- Method-override - to avail usage of HTTP verbs for CRUD operation
### Notes
Half a day effort, as database and authentication layer has been established, wireframe can be reused e.g. login page. Set up nodemailer in order to send email with unique reset link when user has trigger the reset password post route. 
# US.5
**As a** avid singapore rewards hunter,
**I want** to be able to receive email notification when my rewards is near expiring
### Acceptance Criteria
- When user has rewards which is expiring in 3 days, email notification will be send to user daily at 12pm
### Dependencies
- Mongoose - to query the database for rewards expiring in 3 days time
- MomentJS - Wrapper to handle Date object
- NodeMailer - To allow server to send email to user
- NodeCron - to schedule jobs daily at 12pm to trigger email notification
### Notes
Half  day effort, as nodemailer has already been setup, what needs to be done is to schedule a CRON job
