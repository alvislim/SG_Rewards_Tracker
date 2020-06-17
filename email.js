const cron = require('node-cron');
const nodemailer = require("nodemailer");
const moment = require('moment');
const Rewards = require('./models/Rewards');
const mongoose = require('mongoose')


const email = cron.schedule("0 12 * * *", () => {
    // ensure database connection is established in order to query
    const mongoURI = process.env.MONGODB_URI;
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('the connection with mongod is established')
    })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'singaporerewardstracker@gmail.com',
            pass: 'Hateherla1!'
        }
    });
    
    const currentDate = moment()
    const threeDaysFromCurrent = moment().add(4, 'days')
    let expiring = [];
    let users = [];
    // Query the rewards expiry date that falls within 3 days from current date
    const rewardss = Rewards.find({
        rewardsExpiry: {
            $gte: currentDate,
            $lt: threeDaysFromCurrent
        },
        rewardsCheck: false
    }) 
    .then((rewardss)=> {
        for (let key in rewardss) {
            let test = rewardss[key].email
            users.push(test)
        }
            let uniqueUsers = [...new Set(users)]
            uniqueUsers.forEach(userEmail => {
                var mailOptions = {
                    from: 'singaporerewardstracker@gmail.com',
                    to: userEmail,
                    subject: 'You have got Rewards expiring soon!',
                    text: 'You have got rewards that is expiring in 3 days time! Login here to view your overall rewards https://mighty-caverns-14844.herokuapp.com/'
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
    })
})

module.exports = { email };