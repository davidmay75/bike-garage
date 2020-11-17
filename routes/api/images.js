const express = require("express");
const router = express.Router();

const upload = require('./file-upload');
const singleUpload = upload.single('image');//'image' is the key for formData - in Postman

router.post('/', function(req, res) {

  singleUpload(req, res, function(err) {

    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }
    return res.json({'imageUrl': req.file.location});
  });
});

router.get('/', (req, res) => {
    res.json('imagesRoute GET succeeeeeed')
})

module.exports = router;