const jwt = require('jsonwebtoken');
const Account = require('../../../models/account');
const CryptoUtil = require('../../../lib/utils/CryptoUtils');

/*
    POST /api/auth/register
    {
      email,
      password
    }
*/

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // duplicate ID check
  const account = await Account.findOne({ email });

  if (!!account) {
    res.json({
      result: false
    });
  } else {
    // register on blockchain
    const pwdHash = CryptoUtil.hashing(password);
    Account.create('keyStore', 'viteAddress', email, pwdHash);
  }
};
/*
    POST /api/auth/login
    {
      email,
      password
    }
*/

exports.login = (req, res) => {
  const { email, password } = req.body;
  const pwdHash = CryptoUtil.hashing(password);
  const secret = process.env.SECRET_KEY;

  // check user information and issue token
  const check = account => {
    const { _id, email, viteAddress } = account;
    const loggedInfo = {
      email,
      viteAddress
    };
    console.log(_id, email, viteAddress);
    if (!account) {
      // user does not exist
      throw new Error('login failed');
    } else {
      // If the user exists, create a Promise object
      // that asynchronously create JWT
      const p = new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id,
            viteAddress
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'vite',
            subject: 'userInfo'
          },
          (err, token) => {
            if (err) reject(err);
            resolve({ token, loggedInfo });
          }
        );
      });
      return p;
    }
  };

  // response token
  const respond = ({ token, loggedInfo }) => {
    res.cookie('access_token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Expiration date: 7days
      httpOnly: true
    });
    res.json({ loggedInfo });
  };

  // error occurs
  const onError = error => {
    res.status(403).json({
      message: error.message
    });
  };

  // find user
  Account.findOne({ email, pwdHash })
    .then(check)
    .then(respond)
    .catch(onError);
};
