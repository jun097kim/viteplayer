const multer = require('multer');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const Video = require('../../../models/video');
const crypto = require('crypto');

const DIR_PATH = path.resolve(__dirname, '../../../../uploads');
const SCRIPT_PATH = path.resolve(__dirname, '../../../../scripts');

const saveVideoHash = videoPath => {
  const splitedVideoPath = path.join(SCRIPT_PATH, 'videos', videoPath);

  return new Promise((resolve, reject) => {
    const hashList = [];
    fs.readdir(splitedVideoPath, (err, files) => {
      files.forEach(file => {
        const videoFile = path.join(splitedVideoPath, file);
        const s = fs.readFileSync(videoFile);
        const shasum = crypto.createHash('sha1');

        const startTime = path.parse(file).name; // splited video name without extension
        const hashStr = shasum.update(s).digest('hex');

        hashList.push({ startTime, hashStr });
      });
      resolve({ videoPath, hashList });
    });
  });
};

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
    .then(path => saveVideoHash(path))
    .then(({ videoPath, hashList }) => {
      return Video.create(videoPath, hashList);
    })
    .then(() => {
      res.json({ msg: 'success' });
    })
    .catch(err => {
      res.status(403).json({
        message: err
      });
    });
};

/*
    POST /api/video/list
*/

exports.list = (req, res) => {
  Video.find().then(videos => {
    res.json(videos);
  });
};

/*
    POST /api/video/verify
*/

exports.uploadAndVerity = (req, res) => {
  console.log('req.params:', req.params);

  // 검증 요청 영상 업로드
  const upload = multer({
    storage: multer.diskStorage({
      // specity path and file name
      destination: function(req, file, cb) {
        cb(null, DIR_PATH);
      },
      filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + '_test_' + file.originalname); // timestamp + original file name
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

  // 각 구간을 비교하여 {startTime: boolean} 배열로 반환
  const compareHashList = testHash => {
    return new Promise((resolve, reject) => {
      Video.findOne({ _id: req.params.id }).then(video => {
        const originalHash = video.hashList;

        const comparedHash = {};
        for (let i = 0; i < originalHash.length; i++) {
          const startTime = originalHash[i].startTime;

          let match = false;
          if (testHash[i] && testHash[i].startTime) {
            if (
              originalHash[i].startTime === testHash[i].startTime &&
              originalHash[i].hashStr === testHash[i].hashStr
            ) {
              match = true;
            }
          }

          comparedHash[startTime] = match;
        }

        resolve({ comparedHash, originalHash, testHash });
      });
    });
  };

  videoUpload
    .then(path => splitVideo(path))
    .then(path => saveVideoHash(path))
    .then(({ videoPath, hashList }) => compareHashList(hashList))
    .then(({ comparedHash, originalHash, testHash }) => {
      res.json({ comparedHash, originalHash, testHash });
    })
    .catch(err => {
      res.status(403).json({
        message: err
      });
    });
};
