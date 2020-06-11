const moment = require('moment');
const Rewards = require('../models/Rewards');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

module.exports= function(email) {
    const search = Rewards.find({})
    console.log(search)
}