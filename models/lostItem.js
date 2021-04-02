const { Schema, model } = require('mongoose')

const lostItemSchema = new Schema({
  title: String,

  description: String,
  category: [String],
  status: String,

  timestamp: Date,
  location: {
    gps: String,
    keyword: [String]
  },
  images: [String],
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
  matchedTo: { type: Schema.Types.ObjectId, ref: 'FoundItem' }
})

module.exports = model('LostItem', lostItemSchema)
