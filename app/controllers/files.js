'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const File = models.file

const setModel = require('./concerns/set-mongoose-model')

const multer = require('multer')
const multerUpload = multer({dest: '/tmp'})

const awsUpload = require('lib/aws-upload')
const awsDelete = require('lib/aws-delete')
const awsDownload = require('lib/aws-download')

const create = (req, res, next) => {
  console.log('got here 1')
  // console.log(req)
  const fileUploaded = {
    path: req.file.path,
    body: req.body.file.title,
    user: req.body.user
  }
  console.log(fileUploaded.path)
  console.log('fileUploaded')

  awsUpload(fileUploaded)
  .then((s3Response) => {
    return File.create({
      url: s3Response.Location,
      title: req.body.file.title,
      fileType: req.file.mimetype,
      // title: s3Response.Key,
      tags: req.body.file.tags.split(' ').join(', '),
      _user: req.body.user
    })
  })
  .then((fileUploaded) => res.status(201).json({fileUploaded}))
  .catch(next)
}

const update = (req, res, next) => {
  console.log(req.body)
  console.log(req.file)
  req.file.update(req.body.files)
  .then(() => res.sendStatus(204))
  .catch(next)

  // aws-s3 update goes here
}

const index = (req, res, next) => {
  // Will be used automatically on sign-in
  File.find()
  .then(files => res.json({
    files: files.map((file) =>
      file.toJSON({ virtuals: true }))
  }))
  .catch(next)
}

const show = (req, res, next) => {
  console.log(req.file)
  const s3FileUrl = req.file.url
  console.log(s3FileUrl)
  awsDownload(s3FileUrl)
    .then(() => {
      res.json({
        file: req.file.toJSON({virtuals: true})
      })
    })
  // res.json({
  //   file: req.file.toJSON({ virtuals: true })
  // })
}

const destroy = (req, res, next) => {
  console.log(req.file)
  const s3FileUrl = req.file.url
  console.log(s3FileUrl)
  awsDelete(s3FileUrl)
    .then(() => {
      req.file.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)

  // aws-s3 delete goes here
}

module.exports = controller({
  index,
  show,
  destroy,
  create,
  update
}, {
  before: [
    { method: multerUpload.single('file[file]'), only: ['create'] },
    { method: setModel(File), only: ['show', 'destroy', 'update'] }
  ]
})
