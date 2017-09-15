'use strict'

// Used for testing in terminal
const mongoose = require('./../app/middleware/mongoose')

const File = require('./../app/models/file')

const awsUpload = require('./../lib/aws-upload')

const fileUploaded = {
  path: process.argv[2],
  name: process.argv[3] || 'default'
}

awsUpload(fileUploaded)
  .then((s3Response) => {
    return File.create({
      url: s3Response.Location,
      title: s3Response.Key
    })
  })
  .then(console.log)
  .catch(console.log)
  .then(() => mongoose.connection.close())
