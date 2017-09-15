'use strict'

// Used for testing in terminal
const mongoose = require('./../app/middleware/mongoose')

const File = require('./../app/models/file')

const awsUpload = require('./../lib/aws-upload')

const fileUploaded = {
  path: process.argv[2],
  name: process.argv[3] || 'default',
  tags: process.argv[4] || 'none',
  user: process.argv[5]
}

awsUpload(fileUploaded)
  .then((s3Response) => {
    return File.create({
      url: s3Response.Location,
      title: s3Response.Key,
      tags: fileUploaded.tags,
      user: fileUploaded.user
    })
  })
  .then(console.log)
  .catch(console.log)
  .then(() => mongoose.connection.close())
