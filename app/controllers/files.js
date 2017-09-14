'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const File = models.file

const setModel = require('./concerns/set-mongoose-model')

const multer = require('multer')
// const multerUpload = multer({dest: '/something'})

const awsUpload = require('lib/aws-upload')
