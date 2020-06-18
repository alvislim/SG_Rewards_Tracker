// Express global configuration
const express = require('express'); 
const app = express();

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
      resave: false,
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
require('./routes/rewards')(app);
require('./routes/user')(app);

// MongoDB dependencies
const mongoose = require('mongoose');
const User = require('./models/User');
const Rewards = require('./models/Rewards');

// Connection URL
const mongoURI = process.env.MONGODB_URI


// Connect Mongoose to the server
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('the connection with mongod is established')
})

const email = require('./email')

// Server
app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
});
