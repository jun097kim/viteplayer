const multer = require('multer');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const DIR_PATH = path.resolve(__dirname, '../../../../uploads');

const splitVideo = videoPath => {
  const absolutePath = path.resolve(DIR_PATH, videoPath);

  return new Promise((resolve, reject) => {
    exec(
      `sh scripts/split_video.sh ${absolutePath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        console.log(stdout);
        resolve(videoPath);
      }
    );
  });
};

const uploadVideoToBlockchain = () => {};

/*
    POST /api/video/upload
    form-data {
      video
    }
*/

exports.upload = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      // specity path and file name
      destination: function(req, file, cb) {
        cb(null, DIR_PATH);
      },
      filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + '_' + file.originalname); // timestamp + original file name
      }
    })
  }).single('video');

  const videoUpload = new Promise((resolve, reject) => {
    if (!fs.existsSync(DIR_PATH)) {
      fs.mkdirSync(DIR_PATH);
    }

    upload(req, res, err => {
      if (err) reject(err);
      if (!req.file) reject(new Error('file does not exist'));
      resolve(req.file.filename);
    });
  });

  videoUpload
    .then(path => splitVideo(path))
    .then(path => {
      res.json({ path });
    })
    .catch(err => {
      res.status(403).json({
        message: err
      });
    });
};
