const video = require('express').Router();
const controller = require('./video.controller');

video.post('/upload', controller.upload);
video.post('/list', controller.list);

module.exports = video;
