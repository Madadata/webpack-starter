const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(morgan('combined'));
app.use(helmet());

app.use('/static', express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, host, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info(`listening at ${host}:${port}`);
});
