const { getDescription } = require('graphql');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,

  name: {
    displayName: String,
    firstName: String,
    lastName: String
  },
  birthdate: Date,
  gender: String,

  contactno: [String],
  email: [String],
  address: [{
    line1: String,
    line2: String,
    country: String,
    postalcode: String,
    label: String,
  }],
  device: [String],

  // lostitem: [LostItem],
  // founditem: [FoundItem],

  status: String,
  rank: String,
  signupdate: Date,
});

module.exports = model('User', userSchema); 
