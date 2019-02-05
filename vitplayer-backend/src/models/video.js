const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const VideoHash = new Schema({
  startTime: String,
  hashStr: String
});

const Video = new Schema({
  videoName: String,
  hashList: [VideoHash],
  createdAt: { type: Date, default: Date.now }
});

Video.statics.create = function(videoName, hashList) {
  const video = new this({
    videoName,
    hashList
  });

  return video.save();
};

autoIncrement.initialize(mongoose.connection);
Video.plugin(autoIncrement.plugin, 'Video');

module.exports = mongoose.model('Video', Video);
