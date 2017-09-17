'use strict'
require('dotenv').load()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

// const s3DeleteFile = function (s3FileUrl) {
//   // const params = {
//   //   ACL: 'public-read',
//   //   Bucket: process.env.AWS_S3_BUCKET_NAME,
//   //   Key: `${folder}/${fileUploaded.title}${ext}`,
//   //   Body: stream,
//   //   ContentType: contentType
//   // }
//   const s3 = new AWS.S3()
//   s3.deleteObject({
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: key
//   })
// }

const getKey = function (url) {
  const regex = new RegExp(/(?:https):\/\/([a-zA-Z0-9-_]*)(.s3.amazonaws.com\/)/)

  return url.replace(regex, '')
}

const s3DeleteFile = function (s3FileUrl) {
  console.log('got here 1')
  console.log(s3FileUrl)

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: getKey(s3FileUrl)
  }
  console.log('fish')
  console.log(params)

  return new Promise((resolve, reject) => {
    console.log('got here 2')
    s3.deleteObject(params, function (error, data) {
      console.log('got here 3')
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

const awsDelete = function (s3FileUrl) {
  return s3DeleteFile(s3FileUrl)
}

module.exports = awsDelete
