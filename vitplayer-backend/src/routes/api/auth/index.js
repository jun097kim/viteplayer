const auth = require('express').Router();
const controller = require('./auth.controller');

auth.post('/register', controller.register);
auth.post('/login', controller.login);

module.exports = auth;
