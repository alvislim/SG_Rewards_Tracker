// Express global configuration
const express = require('express'); 
const app = express();

const assert = require('assert');

// Put delete request
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Passport configuration
const passport = require('passport');
require('./config/passport')(passport);

// Environment
const PORT = process.env.PORT ||3000;

// Require flash
const flash = require('connect-flash');
const session = require('express-session');

// Static file
app.use(express.static('public'));

////////////////////////////////////////////
//Middleware
//Body Parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//Middleware
////////////////////////////////////////////

// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Routes 
require('./routes/index')(app);
require('./routes/user')(app);

// MongoDB dependencies
const mongoose = require('mongoose');
const user = require('./models/User');
const rewards = require('./models/Rewards');

// Global Configuration
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
	console.log('the connection with mongod is established')
})

// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

// Server
app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
});