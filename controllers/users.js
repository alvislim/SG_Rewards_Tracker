// Require database
const User = require('../models/User');
const Rewards = require('../models/Rewards');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const password = require('../config/password')

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

    login: async (req, res) => {
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
            res.render('dashboard.ejs', {
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
    },

    forgotpw: (req, res) => {
        res.render('forgetpw.ejs')
    },

    resetpwemail: (req, res) => {
        const reqEmail = req.body.email
        const search = User.findOne({ email: reqEmail })
            .then(result => {
                if (!result) {
                    req.flash('error', 'Please enter a valid email');
                    res.redirect('/forgotpw')
                }

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'singaporerewardstracker@gmail.com',
                        pass: password.password
                    }
                });

                var mailOptions = {
                    from: 'singaporerewardstracker@gmail.com',
                    to: result.email,
                    subject: 'Singapore Rewards Tracker Password Reset Link',
                    text: `Click on the below link to reset your password \n https://mighty-caverns-14844.herokuapp.com/reset/${result._id}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        req.flash('success_msg', 'We have sent an reset email link to your designated email');
                        res.redirect('/login')
                    }
                });
            })
    },

    resetpwpage: (req, res) => {
        let id = req.params.id
        res.render('reset.ejs', { id })
    },

    resetpw: (req, res) => {

        const id = req.params.id
        let pw = req.body.password

        bcrypt.genSalt(10, async (err, salt) => {
            try {
                const hash = await bcrypt.hash(pw, salt)
                // set password to hashed
                pw = hash;
                let reset = User.findByIdAndUpdate(id, {
                    password: pw
                }).then(result => {
                    req.flash('success_msg', 'Password reset success!');
                    res.redirect('/login')
                }).catch(err => {
                    console.log(err)
                    req.flash('error', 'We are currently facing some technical issue, please try again');
                    res.redirect('/login')
                })
            } catch (err) {
                console.log(err)
            }
        })

    }

}

module.exports = page;