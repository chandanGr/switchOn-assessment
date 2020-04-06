const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage(
    {
        destination: (req, file, next) => {
            next(null,path.join(__dirname+'../../../uploads'))
        },
        filename: (req, file, next) => {
            let fileEtension = file.mimetype.split('/')[1];
            next(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + fileEtension);
        }
    })

const fileTypeFilter = function (req, file, next) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        next(null, true);
    }
    else {
        next(null, false);
    }
}

exports.upload = multer({ storage: fileStorage, fileFilter: fileTypeFilter }).single('uploadfile')