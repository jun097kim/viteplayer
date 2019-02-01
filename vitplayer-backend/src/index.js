const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

// Connect MongoDB server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});
