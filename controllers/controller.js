// Require User
const User = require('../models/User');

// Bcrypt for encrypted password
const bcrypt = require('bcryptjs');

// Passport
const passport = require('passport');

const page = {
    homePage: (req, res) => {
        res.render('homepage.ejs')
    },

    login: (req, res) => {
        res.render('login.ejs')
    },

    register: (req, res) => {
        res.render('register.ejs')
    },

    registerHandler: (req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        // Check password = password2
        if (password !== password2) {
            errors.push({ msg: "Passwords do not match" });
        }

        // Check length of password
        if (password.length < 6) {
            errors.push({ msg: "Password should be at least 6 Characters" });
        } 
        
        if (errors.length >0) {
            res.render('register.ejs', {
                errors,
                name,
                email,
                password,
                password2
            })
        } else {
            // Validated whether email exists
            User.findOne({ email: email})
            .then(user => {
                if(user) {
                    // User exists
                    errors.push({msg: "Email is already registered"})
                    res.render('register.ejs', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                    // Hash Password
                    bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) =>{
                            if(err) throw err;
                            // set password to hashed
                            newUser.password = hash;
                            //save user into mongoDB
                            newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered!');
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err))
                        })
                    })
                }
            });
        }
    },

    // Login Handler
    loginHandler: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },

    // Dashboard
    dashboard: (req, res) => {
        res.render('dashboard.ejs', {name: req.user.name})
    },

    logoutHandler: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/login')
    }
}


module.exports = page;