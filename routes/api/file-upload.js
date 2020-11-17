const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config()

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACESSKEY_ID,
  region:  process.env.REGION
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'bike-garage-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;