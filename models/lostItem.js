const { getDescription } = require('graphql');
const { Schema, model } = require('mongoose');

const lostItemSchema = new Schema({ 
    title: String,

    description: String,
    category: [String],
    status: String,
    
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
    // matchedTo: FoundItem,
});

module.exports = model('LostItem', lostItemSchema); 