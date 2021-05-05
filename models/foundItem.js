const { Schema, model } = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

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
  claimedBy: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
  matchedTo: { type: Schema.Types.ObjectId, ref: 'LostItem', autopopulate: true }
}, {
  strict: true,
  strictQuery: true, // Turn on strict mode for query filters
  timestamps: true
})
foundItemSchema.plugin(autopopulate)

foundItemSchema.virtual('possibleMatches').get(function () {
  return model('LostItem').find({ $text: { $search: this.title } })
})

module.exports = model('FoundItem', foundItemSchema)
