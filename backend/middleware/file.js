
const multer = require('multer');
const path = require('path');

const MIME_TYPE = {
    "image/jpeg": "jpeg", 
    "image/gif": "gif",
    "image/jpg": "jpg",
    "image/png": "png"	
}


const storage = multer.diskStorage({
    fileFilter: (req, file, cb) =>{
        if(MIME_TYPE[file.mimetype]!==undefined){
            cb(null, true);
        }
        else{
            const error = new Error("Only images are allowed!")
            cb(error, false);
        }
    },
    destination: (req, file, cb) => {
        const imagePath = path.join(__dirname,'../images'); 
        cb(null, imagePath)
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE[file.mimetype];
        const date = Date.now();
        cb(null, `${name}-${date}.${ext}`);
    }
  })

  module.exports = multer({storage:storage}).single('image');
  