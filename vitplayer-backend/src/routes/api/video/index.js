const video = require('express').Router();
const controller = require('./video.controller');

video.post('/upload', controller.upload);

module.exports = video;
