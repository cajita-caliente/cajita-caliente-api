'use strict'
require('dotenv').load()
const AWS = require('aws-sdk')
const fs = require('fs')
const mime = require('mime')
const path = require('path')

const s3DeleteFile = function (key) {
  // const params = {
  //   ACL: 'public-read',
  //   Bucket: process.env.AWS_S3_BUCKET_NAME,
  //   Key: `${folder}/${fileUploaded.title}${ext}`,
  //   Body: stream,
  //   ContentType: contentType
  // }
  const s3 = new AWS.S3()
  s3.deleteObject({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key
  })
}

module.exports = s3DeleteFile
