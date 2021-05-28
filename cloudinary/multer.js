let multer = require('multer');
let path = require('path');


//  storage instance
var storage = multer.diskStorage({
    destination: function (req, file, callback) { //  location to save file
      callback(null, './public/uploads')
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
});

var storage2 = multer.memoryStorage()


//  obj
module.exports = multer({
    storage: storage2,
    limits: {fileSize: 2500000},  //  2 MB max
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
});




function checkFileType(file, callback) {
  //  alllowed extensions
  const ext = /jpeg|jpg|png|gif/;
  //  check extension
  const extension = ext.test(path.extname(file.originalname).toLowerCase());
  const mimetype = ext.test(file.mimetype);
  //  check if both are correct
  if (extension && mimetype)
      callback(null, true);
  else
      callback('Error: only images');
}
