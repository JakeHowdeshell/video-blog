const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field on save
commentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;