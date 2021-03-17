const { getDescription } = require('graphql');
const { Schema, model } = require('mongoose');

const itemFoundSchema = new Schema({ 
  title: String,

  description: String,
  category: [String],
  status: String,
  dropofflocation:  {
    gps: String,
    keyword: [String]
  },

  timestamp: Date,
  location:  {
      gps: String,
      keyword: [String]
  },
  image: [String],
  keyword: [String],

  comment: [{
      // user: User,
      timestamp: Date,
      text: String,
  }],
  vote: [{
      // user: User,
      timestamp: Date,
      score: Number,
  }],

  // reportedBy: User,
  // claimedBy: User,
  // matchedTo: FoundItem,

});

module.exports = model('ItemFound', itemFoundSchema); 