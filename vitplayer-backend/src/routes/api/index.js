const api = require('express').Router();
const auth = require('./auth');
const video = require('./video');

api.use('/auth', auth);
api.use('/video', video);

module.exports = api;
