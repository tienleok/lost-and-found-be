const { Schema, model } = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const lostItemSchema = new Schema({
  title: String,

  description: String,
  category: [String],
  status: String,

  timestamp: Date,
  location: {
    gps: String,
    keywords: [{ type: String, lowercase: true, trim: true }]
  },
  images: [{
    name: String,
    type: { type: String },
    data: Buffer,
    keywords: [{ type: String, lowercase: true, trim: true }]
  }],
  keywords: [{ type: String, lowercase: true, trim: true }],

  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
    timestamp: Date,
    text: String
  }],
  votes: [{
    user: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
    timestamp: Date,
    score: Number
  }],

  reportedBy: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
  matchedTo: { type: Schema.Types.ObjectId, ref: 'FoundItem', autopopulate: true }
}, {
  strict: true,
  strictQuery: true, // Turn on strict mode for query filters
  timestamps: true
})
lostItemSchema.plugin(autopopulate)

lostItemSchema.virtual('possibleMatches').get(function () {
  return model('FoundItem').find({ $text: { $search: this.title } })
})

module.exports = model('LostItem', lostItemSchema)
