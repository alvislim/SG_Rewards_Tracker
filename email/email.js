const moment = require('moment');
const Rewards = require('../models/Rewards');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

module.exports = function (email) {
    const currentDate = moment()
    const threeDaysFromCurrent = moment().add(3, 'days')
    const rewards = await Rewards.find({
        rewardsExpiry: {
            $gte: currentDate,
            $lt: threeDaysFromCurrent
        },
        rewardsCheck: false
    })
}

