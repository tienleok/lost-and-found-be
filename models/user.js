const { Schema, model } = require('mongoose')

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

  contactnos: [String],
  emails: [String],
  addresses: [{
    line1: String,
    line2: String,
    country: String,
    postalcode: String,
    label: String
  }],
  devices: [String],

  lostitems: [{ type: Schema.Types.ObjectId, ref: 'LostItem' }],
  founditems: [{ type: Schema.Types.ObjectId, ref: 'FoundItem' }],

  status: String,
  rank: String,
  signupdate: Date
})

module.exports = model('User', userSchema)
