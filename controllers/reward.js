const Rewards = require('../models/Rewards');
const moment = require('moment');
const rewards = require('../routes/rewards');

const pages = {
    rewardsPage: async (req, res) => {
        try {
            const rewards = await Rewards.find({ email: req.user.email })
            res.render('rewardspage.ejs', { rewards, email: req.user.email, moment: moment });
        } catch (err) {
            req.flash('error_msg', 'We are currently encountering technical issues with our server, please try again later')
            res.redirect('/dashboard')
            console.log(err)
        }
    },

    // Add Rewards
    addRewards: async (req, res) => {
        try {
            const { email, rewardsType, rewardsAmount, rewardsExpiry, rewardsLocation } = req.body;
            const newRewards = new Rewards({
                email, rewardsType, rewardsAmount, rewardsExpiry, rewardsLocation
            })
            newRewards.email = await req.user.email
            newRewards.rewards = await newRewards.save()
            req.flash('success_msg', 'You have added a rewards for tracking purposes!');
            res.redirect('/rewardspage')
        } catch (err) {
            req.flash('error_msg', 'Please make sure your all the fields are filled!')
            res.redirect('/rewardspage')
            console.log(err)
        }
    },

    editRewardsPage: async (req, res) => {
        try {
            let index = req.params.index
            const result = await Rewards.findById(index)
            res.render('editrewards.ejs', { index, result })
        } catch (err) {
            req.flash('error_msg', 'We are currently encountering technical issues with our server, please try again later')
            res.redirect('/rewardspage')
        }
    },

    updateRewards: async (req, res) => {
        try {
            let index = req.params.index
            const { rewardsType, rewardsAmount, rewardsExpiry, rewardsLocation } = req.body
            const updatedRewards = await Rewards.findByIdAndUpdate(index, {
                rewardsType: rewardsType,
                rewardsAmount: rewardsAmount,
                rewardsExpiry: rewardsExpiry,
                rewardsLocation: rewardsLocation,
            })
            if (!rewardsExpiry || !rewardsAmount || !rewardsExpiry || !rewardsLocation) {
                req.flash('error_msg', 'Please make sure you have enter all the form input field');
                res.redirect(`/rewardspage/${index}/edit`)
            }
            req.flash('success_msg', 'You have successfully updated a rewards!');
            res.redirect('/rewardspage')
        }
        catch (err) {
            req.flash('error_msg', 'We are having some issues with our server, please try again later');
            res.redirect('/rewardspage')
        }
    },

    deleteRewardsEntry: async (req, res) => {
        try {
            let index = req.params.index
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
            let index = req.params.index
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
    },
}

module.exports = pages;