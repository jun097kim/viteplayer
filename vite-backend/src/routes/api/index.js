const api = require('express').Router();
const auth = require('./auth');

api.use('/auth', auth);

module.exports = api;
