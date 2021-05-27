let multer = require('multer');
let path = require('path');


//  storage instance
var storage = multer.diskStorage({
    destination: function (req, file, callback) { //  location to save file
      callback(null, './uploads')
    },
    filename: function (req, file, callback) {

      callback(null, 'hello' + path.extname(file.originalname));
    }
});


//  obj
module.exports = multer({
    storage: storage,
    // limits: {fileSize: 100000},
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
}).single('img');




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
