'use strict'

require('dotenv').load()
const AWS = require('aws-sdk')
const fs = require('fs')
const mime = require('mime')
const path = require('path')

const s3Upload = function (fileUploaded, options) {
  const stream = fs.createReadStream(fileUploaded.path)

  const contentType = mime.getType(fileUploaded.path)

  const ext = path.extname(fileUploaded.path)

  const folder = new Date().toISOString().split('T')[0]

  // params require for `.upload` to work
  // more at documentation
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${fileUploaded.name}${ext}`,
    Body: stream,
    ContentType: contentType
  }

  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3()
    s3.upload(params, function (error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

const awsUpload = function (fileUploaded) {
  return s3Upload(fileUploaded)
}

module.exports = awsUpload
