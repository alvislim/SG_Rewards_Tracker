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
        if (password !== password2)  errors.push({ msg: "Passwords do not match" });
        
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

    rewardsPage: async (req, res) => {
        try {
            const currentDate = moment()
            const threeDaysFromCurrent = moment().add(3, 'days')
            const rewards = await Rewards.find({})
            res.render('rewardspage.ejs', { rewards, email: req.user.email, moment: moment });
        } catch (err) {
            req.flash('error_msg', 'We are currently encountering technical issues with our server, please try again later')
            res.redirect('/dashboard')
            console.log(err)
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

    // Add Rewards
    addRewards: async (req, res) => {
        try {
            const { email, rewardsType, rewardsAmount, rewardsExpiry, rewardsLocation } = await req.body;
            const newRewards = new Rewards({
                email, rewardsType, rewardsAmount, rewardsExpiry, rewardsLocation
            })
            newRewards.email = await req.user.email
            newRewards.rewards =
            await newRewards.save()
            req.flash('success_msg', 'You have added a rewards for tracking purposes!');
            res.redirect('/rewardspage')
        } catch (err) {
            req.flash('error_msg', 'We are currently encountering technical issues with our server, please try again later')
            res.redirect('/rewardspage')
        }
    },

    editRewardsPage: async (req, res) => {
        try {
            let index = await req.params.index
            const result = await Rewards.findById(index)
            res.render('editrewards.ejs', { index, result })
        } catch (err) {
            req.flash('error_msg', 'We are currently encountering technical issues with our server, please try again later')
            res.redirect('/rewardspage')
        }
    },

    updateRewards: async (req, res) => {
        try {
            let index = await req.params.index
            const { rewardsType, rewardsAmount, rewardsExpiry, rewardsLocation } = await req.body
            const updatedRewards = await Rewards.findByIdAndUpdate(index, {
                rewardsType: rewardsType,
                rewardsAmount: rewardsAmount,
                rewardsExpiry: rewardsExpiry,
                rewardsLocation: rewardsLocation,
            })
            if(!rewardsExpiry) {
                req.flash('error_msg', 'Date field is empty!');
                res.redirect(`/rewardspage/${index}/edit`) 
            } else {
                req.flash('success_msg', 'You have successfully updated a rewards!');
                res.redirect('/rewardspage')
            }
        }
        catch (err) {
            req.flash('error_msg', 'We are having some issues with our server, please try again later');
            res.redirect('/rewardspage')
        }
    },

    deleteRewardsEntry: async (req, res) => {
        try {
            let index = await req.params.index
            await Rewards.findByIdAndRemove(index)
            req.flash('success_msg', 'You have successfully deleted a rewards!');
            res.redirect('/rewardspage')
        } catch (err) {
            req.flash('success_msg', 'You have successfully deleted a rewards!');
            res.redirect('/rewardspage')
        }
    },

    updateCheckBox: async (req, res) => {
        try {
            let index = await req.params.index
            const checkBox = await Rewards.findById(index, {
                rewardsCheck: 1,
                _id: 0
            })
            let checkBoxValue = checkBox.rewardsCheck
            checkBoxValue == false ? checkBoxValue = true : checkBoxValue = false;
            const updatedRewards = await Rewards.findByIdAndUpdate(index, {
                rewardsCheck: checkBoxValue,
            })
            req.flash('success_msg', 'You have successfully redeemed a reward!');
            res.redirect('/rewardspage')
        } catch (err) {
            req.flash('error_msg', 'We are having some issues with our server, please try again later');
            res.redirect('/rewardspage')
        }
    }
}

module.exports = page;