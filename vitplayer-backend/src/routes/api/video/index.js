const video = require('express').Router();
const controller = require('./video.controller');

video.post('/upload', controller.upload);
video.post('/list', controller.list);
video.post('/verify/:id', controller.uploadAndVerity);

module.exports = video;
