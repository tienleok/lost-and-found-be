const { Schema, model } = require('mongoose')

const nameSchema = new Schema({
  displayName: String,
  firstName: String,
  lastName: String
})

const phoneSchema = new Schema({
  data: String,
  label: String
})

const emailSchema = new Schema({
  data: String,
  label: String
})

const addressSchema = new Schema({
  line1: String,
  line2: String,
  country: String,
  postalcode: String,
  label: String
})

const userSchema = new Schema({
  username: String,
  password: String,
  token: Buffer,
  roles: [String],

  name: nameSchema,
  birthdate: Date,
  gender: String,

  contactnos: [phoneSchema],
  emails: [emailSchema],
  addresses: [addressSchema],
  devices: [String],

  lostitems: [{ type: Schema.Types.ObjectId, ref: 'LostItem' }],
  founditems: [{ type: Schema.Types.ObjectId, ref: 'FoundItem' }],

  status: String,
  rank: String,
  signupdate: { type: Date, default: Date.now }
})

module.exports = model('User', userSchema)
