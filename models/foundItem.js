const { Schema, model } = require('mongoose')
// const { Image } = require('./common')

const foundItemSchema = new Schema({
  title: { type: String, required: true },

  description: String,
  category: [String],
  status: String,
  dropofflocation: {
    gps: String,
    keyword: [String]
  },

  timestamp: Date,
  location: {
    gps: String,
    keywords: [String]
  },
  images: [{
    name: String,
    type: { type: String },
    data: Buffer,
    keywords: [String]
  }],
  keywords: [String],

  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date,
    text: String
  }],
  votes: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date,
    score: Number
  }],

  reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  claimedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  matchedTo: { type: Schema.Types.ObjectId, ref: 'LostItem' },
  possibleMatches: [{ type: Schema.Types.ObjectId, ref: 'LostItem' }]
})

module.exports = model('FoundItem', foundItemSchema)
