'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const File = models.file

const setModel = require('./concerns/set-mongoose-model')

const multer = require('multer')
const multerUpload = multer({dest: '/tmp'})

const awsUpload = require('lib/aws-upload')

const create = (req, res, next) => {
  const fileUploaded = {
    path: req.file.path,
    body: req.body.file.title
  }

  awsUpload(fileUploaded)
  .then((s3Response) => {
    return File.create({
      url: s3Response.Location,
      title: s3Response.Key
    })
  })
  .then((fileUploaded) => res.status(201).json({fileUploaded}))
  .catch(next)
}

const update = (req, res, next) => {
  req.file.update(req.body.file)
  .then(() => res.sendStatus(204))
  .catch(next)
}

const index = (req, res, next) => {
  File.find()
  .then(files => res.json({
    files: files.map((file) =>
      file.toJSON({ virtuals: true }))
  }))
  .catch(next)
}

const show = (req, res, next) => {
  res.json({
    file: req.upload.toJSON({ virtuals: true })
  })
}

const destroy = (req, res, next) => {
  req.file.remove()
  .then(() => res.sendStatus(204))
  .catch(next)
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
