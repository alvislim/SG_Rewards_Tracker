const mongoose = require('mongoose');// require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

const RewardsSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  rewardsType: {
    type: String,
    required: true
  },

  rewardsAmount: {
    type: Number,
    required: true,
    min: 1
  },

  rewardsExpiry: {
    type: Date,
    required: true
  },

  rewardsLocation: {
    type: String,
    required: true
  },

  rewardsCheck: {
    type: Boolean,
    default: false,
    required: true
  }

});

const Rewards = mongoose.model('Rewards', RewardsSchema)

module.exports = Rewards;