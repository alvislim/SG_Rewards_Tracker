# Rewards Tracker

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
### US.1
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

### US.2
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

### US.3
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
