// Require database
const User = require('../models/User');
const Rewards = require('../models/Rewards');

// Bcrypt for encrypted password
const bcrypt = require('bcryptjs');

// Passport
const passport = require('passport');

// Moment JS
const moment = require('moment');

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
        if (password !== password2) errors.push({ msg: "Passwords do not match" });

        // Check length of password
        if (password.length < 6) errors.push({ msg: "Password should be at least 6 Characters" });

        if (errors.length > 0) {
            res.render('register.ejs', {
                errors,
                name,
                email,
                password,
                password2
            })
        } else {
            // Validated whether email exists
            User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        // User exists
                        errors.push({ msg: "Email is already registered" })
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
                        bcrypt.genSalt(10, async (err, salt) => {
                            try {
                                const hash = await bcrypt.hash(newUser.password, salt)
                                // set password to hashed
                                newUser.password = hash;
                                //save user into mongoDB
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'You are now registered!');
                                        res.redirect('/login');
                                    })
                                    .catch(err => console.log(err))
                            } catch (err) {
                                console.log(err)
                            }
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
    dashboard: async (req, res) => {
        try {
            await res.render('dashboard.ejs', {
                name: req.user.name,
                email: req.user.email
            })
        } catch (err) {
            req.flash('error_msg', 'We are currently encountering technical issues with our server, please try again later')
            res.redirect('/login')
        }
    },

    logoutHandler: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/login')
    },

    // About us
    about: (req, res) => {
        res.render('about.ejs')
    }
}

module.exports = page;