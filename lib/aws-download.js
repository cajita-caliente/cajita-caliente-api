'use strict'

require('dotenv').load()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const path = require('path')
const fs = require('fs')

const getKey = function (url) {
  const regex = new RegExp(/(?:https):\/\/([a-zA-Z0-9-_]*)(.s3.amazonaws.com\/)/)

  return url.replace(regex, '')
}

const s3DownloadFile = function (s3FileUrl) {
  console.log('I\'m here 1')
  console.log(s3FileUrl)

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: getKey(s3FileUrl)
  }

  console.log('I\'m here 2')
  console.log(params.Key)

  s3.getObject(params).createReadStream().on('error', function (error) {
    console.log(error)
  }).pipe(res)

}

const awsDownload = function (s3FileUrl) {
  return s3DownloadFile(s3FileUrl)
}

module.exports = awsDownload
