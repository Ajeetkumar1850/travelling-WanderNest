const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review Schema
const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,       
    min: 1,               
    max: 5                
  },
  comment: {
    type: String,
    required: true        
  },
  createdAt: {
    type: Date,
    default: Date.now()    
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
         
  },
});
module.exports = mongoose.model('Review', reviewSchema);
