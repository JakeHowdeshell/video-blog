const mongoose = require('mongoose');

const { Schema } = mongoose;

const uploadSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      url: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        required: true
      },
      format: {
        type: String,
        required: true
      },
      uploadDate: {
        type: Date,
        default: Date.now
      },
      uploader: {
        type: String,
        required: true,
        trim: true
      }
    });

const Upload = mongoose.model('Uploads', uploadSchema);

module.exports = Upload;