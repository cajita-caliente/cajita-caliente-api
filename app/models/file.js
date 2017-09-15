'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const File = mongoose.model('File', fileSchema)

module.exports = File
