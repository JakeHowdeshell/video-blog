const mongoose = require("mongoose");
const Comment = require('./Comment');

const { Schema } = mongoose;

const uploadSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [Comment.schema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

uploadSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

const Upload = mongoose.model("Uploads", uploadSchema);

module.exports = Upload;
