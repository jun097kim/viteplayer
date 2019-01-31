const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Account collection data schema
const Account = new Schema({
  keyStore: JSON,
  viteAddress: String,
  email: String,
  pwdHash: String
});

// create Account document
Account.statics.create = function(keyStore, viteAddress, email, pwdHash) {
  const account = new this({ keyStore, viteAddress, email, pwdHash });

  // return Promise
  return account.save();
};

module.exports = mongoose.model('Account', Account);
