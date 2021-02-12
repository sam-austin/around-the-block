import AWS from "aws-sdk";
import multer from "multer"
import multerS3 from "multer-s3"

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const s3 = new AWS.S3({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid file Type, only JPEG and PNG are allowed!'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: "around-the-block",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

export default upload