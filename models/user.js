const { Schema, model } = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

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
  username: { type: String, required: true },
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

  status: String,
  rank: String,
  signupdate: { type: Date, default: Date.now }
}, {
  strict: true,
  strictQuery: true, // Turn on strict mode for query filters
  timestamps: true
})
userSchema.plugin(autopopulate)

userSchema.virtual('lostitems').get(function () {
  return model('LostItem').find({ reportedBy: this._id })
})
userSchema.virtual('founditems').get(function () {
  return model('FoundItem').find({ reportedBy: this._id })
})

module.exports = model('User', userSchema)
